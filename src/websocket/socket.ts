import type { WSMessage, MessageHandler } from "./types";

let socket: WebSocket | null = null;


// Establece una conexión WebSocket con el servidor si aún no está abierta.
// También configura los listeners para eventos del socket.
export const connectSocket = (onMessage?: MessageHandler) => {
    if (socket && socket.readyState === WebSocket.OPEN) return socket;

    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("WebSocket conectado");
    };

    socket.onmessage = async (event: MessageEvent) => {
        try {
            const text = await (event.data instanceof Blob
                ? event.data.text()
                : Promise.resolve(event.data));

            const data: WSMessage = JSON.parse(text);
            onMessage?.(data);
        } catch (err) {
            console.error("Error procesando mensaje WebSocket:", err);
        }
    };

    socket.onclose = () => {
        console.warn("WebSocket cerrado");
        socket = null;
    };

    return socket;
};


// Envía un mensaje a través del WebSocket si está abierto.
export const sendMessage = (message: WSMessage) => {
    if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn("No se puede enviar: WebSocket no está abierto.");
    }
};
