export type WSMessage = {
    id: string;
    type: string;
    payload?: any;
};

export type MessageHandler = (message: WSMessage) => void;
