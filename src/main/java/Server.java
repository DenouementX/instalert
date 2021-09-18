import com.google.gson.Gson;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.github.cdimascio.dotenv.Dotenv;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import org.sql2o.quirks.PostgresQuirks;
import spark.utils.IOUtils;
import static spark.Spark.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;


public class Server {

    private static Sql2o sql2o;

    private static Sql2o getSql2o() {
        if (sql2o == null) {
            try {
                Properties props = getDbUrl(System.getenv("DATABASE_URL"));
                sql2o = new Sql2o(new HikariDataSource(new HikariConfig(props)), new PostgresQuirks());
            } catch (URISyntaxException | Sql2oException e) {
                e.printStackTrace();
            }

            try (org.sql2o.Connection con = sql2o.beginTransaction()) {
                //con.createQuery(LightsSchema).executeUpdate();
                // TODO: PUT SCHEMAS HERE
                con.commit();
            } catch (Sql2oException e) {
                e.printStackTrace();
            }
        }

        return sql2o;
    }

    private static Properties getDbUrl(String databaseUrl) throws URISyntaxException {
        Properties props = new Properties();
        if (databaseUrl == null) {
            Dotenv dotenv = Dotenv.load();
            props.setProperty("username", dotenv.get("DEV_DB_USER"));
            props.setProperty("password", dotenv.get("DEV_DB_PWORD"));
            props.setProperty("jdbcUrl", dotenv.get("DEV_DB_URL"));
        } else {
            URI dbUri = new URI(databaseUrl);

            props.setProperty("username", dbUri.getUserInfo().split(":")[0]);
            props.setProperty("password", dbUri.getUserInfo().split(":")[1]);
            props.setProperty("jdbcUrl", "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort()
                    + dbUri.getPath() + "?sslmode=require");
        }

        return props;
    }

    final static int PORT_NUM = 7000;

    private static int getHerokuAssignedPort() {
        String herokuPort = System.getenv("PORT");
        if (herokuPort != null) {
            return Integer.parseInt(herokuPort);
        }
        return PORT_NUM;
    }
    public static void main(String[] args) {
        port(getHerokuAssignedPort());
        getSql2o();

        staticFiles.location("/");

        get("/", (req, res) -> "oog");
    }
}
