let socket: WebSocket | null = null;

type WSMessage = {
    id: string;
    type: string;
    payload?: any;
};

type MessageHandler = (message: WSMessage) => void;

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

export const sendMessage = (message: WSMessage) => {
    if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn("No se puede enviar: WebSocket no está abierto.");
    }
};
