import spark.Spark;
import spark.utils.IOUtils;
import static spark.Spark.*;

import com.google.gson.Gson;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.eclipse.jetty.websocket.api.Session;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import model.MessRequest;

public class Server {

    static Firestore db = null;

    private static void initFirebase() {
        GoogleCredentials credentials = null;
        try {
            InputStream serviceAccount = new FileInputStream("service_account/instalert-dev-firebase-adminsdk-i6f0e-5fc15e8d69.json");
            credentials = GoogleCredentials.fromStream(serviceAccount);
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }
        FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(credentials).build();
        FirebaseApp.initializeApp(options);
        db = FirestoreClient.getFirestore();
    }

    final static int PORT_NUM = 7000;

    private static int getHerokuAssignedPort() {
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        return PORT_NUM;
    }

    public static String geoLocFormatString = "https://www.google.com/maps/search/?api=1&query=%f,%f";

    public static String messRequestDescriptiveFormatString = "[CONTACTNAME], this is [USERNAME]. I am borrowing another number. I am in [1] and for reasons of personal safety cannot call or text at the moment. Do not call or text me via my personal number. [2]."
            + "\n" + "\n" + "My current location is at [GEOLOC]" + "\n" + "\n"
            + "\n" + "\n" + "To acknowledge receipt of this message, reply with \"1\"." + "\n" + "\n"
            + "This message was sent through Instalert.";

    public static String makeValidFStringFromDescriptiveFString(String descriptiveFString) {
        return descriptiveFString.replaceAll("\\[(.*?)\\]", "%s");
    }

    // public static String messRequestFormatString = "%s, this is %s. I am
    // borrowing another number. I am in %s and for reasons of personal safety
    // cannot call or text at the moment. Do not call or text me, and do not respond
    // to this text. %s." + "\n" +
    // "\n" +
    // "My current location is at %s" + "\n" +
    // "\n" +
    // "This message was sent through Instalert.";

    public static String messRequestFormatString = makeValidFStringFromDescriptiveFString(
            messRequestDescriptiveFormatString);

    public static String[][] messRequestFormatStringOptions = {
            { "an uncomfortable situation", "a bad situation", "an emergency", },
            { "Please come pick me up", "Please send help soon", "Please send help immediately", }, };

    public static void initTwilio() {
        String sid = "";
        String token = "";

        try {
            Dotenv dotenv = Dotenv.load();
            sid = dotenv.get("SID");
            token = dotenv.get("TOKEN");
        } catch (DotenvException e) {
            sid = System.getenv("SID");
            token = System.getenv("TOKEN");
        }

        Twilio.init(sid, token);
    }

    static CopyOnWriteArrayList<Session> sessionList = new CopyOnWriteArrayList<>();

    public static void broadcastMessage(String msg) {
        sessionList.stream().filter(Session::isOpen).forEach(session -> {
            try {
                session.getRemote().sendString(msg);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    

    public static void main(String[] args) {
        initFirebase();
        initTwilio();

        port(getHerokuAssignedPort());

        staticFiles.location("/");

        webSocket("/api/socket", WebSocketHandler.class);
        init();

        get("", (req, res) -> {
            res.status(200);
            res.type("text/html");

            return IOUtils.toString(Spark.class.getResourceAsStream("/index.html"));
        });

        get("/", (req, res) -> {
            res.status(200);
            res.type("text/html");

            return IOUtils.toString(Spark.class.getResourceAsStream("/index.html"));
        });

        notFound((req, res) -> {
            res.status(200);
            res.type("text/html");

            return IOUtils.toString(Spark.class.getResourceAsStream("/index.html"));
        });

        post("/api/send-message", (req, res) -> {
            res.status(200);

            String blob = req.body();
            MessRequest r = new Gson().fromJson(blob, MessRequest.class);

            // Form string
            String geoLocString = String.format(geoLocFormatString, r.user.geoLocation.lat, r.user.geoLocation.lng);
            String awaitSeverityString = String.format(messRequestFormatString, r.contact.firstName, r.user.firstName,
                    "%s", "%s", geoLocString);
            String formedTextString = String.format(awaitSeverityString, Arrays.stream(messRequestFormatStringOptions)
                    .map(options -> options[r.severity]).toArray(String[]::new));

            // Send formedTextString to twilio endpoint
            Message message = Message
                    .creator(new PhoneNumber(r.contact.phoneNumber), new PhoneNumber("+14092237957"), formedTextString)
                    .create();

            System.out.println(message.getSid());

            return "";
        });

        post("/api/sms", (req, res) -> {
            String phoneNumber = req.queryParams("From");
            String msgBody = req.queryParams("Body");

            String username = "";

            ApiFuture<QuerySnapshot> query = db.collection("contacts").get();
            QuerySnapshot querySnapshot = null;
            try {
                querySnapshot = query.get();
            } catch (Exception e) {
                System.out.println(e.getStackTrace());
            }
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                if (phoneNumber.equals(document.getString("phoneNumber"))) {
                    username = document.getString("username");
                }
            }

            System.out.println(phoneNumber);
            System.out.println(msgBody);
            
            // TODO: check message body for confirmation seq
            if (!username.equals("")) {
                broadcastMessage(username + " liked your post");
            }

            return "";
        });

    }
}
