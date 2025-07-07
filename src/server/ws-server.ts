import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
    console.log("Cliente conectado");

    ws.on("message", (message: WebSocket.RawData) => {
        console.log("Mensaje recibido:", message.toString());

        // Reenviar a todos los clientes excepto el que envió el mensaje
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Cliente desconectado");
    });
});

console.log("Servidor WebSocket corriendo en ws://localhost:8080");
