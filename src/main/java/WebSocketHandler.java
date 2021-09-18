import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.api.Session;

@WebSocket
public class WebSocketHandler {

    @OnWebSocketConnect
    public void onConnect(Session user) throws Exception {
        Server.sessionList.add(user);
    }

    @OnWebSocketClose
    public void onClose(Session user) {
        Server.sessionList.remove(user);
    }

}   
