import WebSocket, { WebSocketServer } from "ws";

let wss: WebSocketServer | null = null;

export function getWSServer(server: any) {
  if (!wss) {
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
      console.log("✅ WS connected");

      ws.on("message", (message) => {
        const data = JSON.parse(message.toString());

        wss?.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      });
    });
  }

  return wss;
}