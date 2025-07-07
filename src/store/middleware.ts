import { Action, Middleware } from "@reduxjs/toolkit";
import { saveTasksToStorage } from "@/utils/localStorage";
import { sendMessage } from "@/websocket/socket";


export const persistTasksMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const act = action as Action;
    const user = storeAPI.getState().auth.user;

    if (user && act.type.startsWith("tasks")) {
        const tasksState = storeAPI.getState().tasks;
        saveTasksToStorage(user, tasksState);
    }

    return result;
}

export const websocketMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const act = action as Action;

    const SYNC_ACTIONS = [
        "tasks/addTask",
        "tasks/editTask",
        "tasks/deleteTask",
        "tasks/changeTaskStatus",
        "tasks/toggleFavorite",
    ];

    if (SYNC_ACTIONS.includes(act.type)) {
        const message = {
            id: crypto.randomUUID(),
            type: "UPDATE_TASKS",
            payload: storeAPI.getState().tasks,
        };
        sendMessage(message);
    }

    return result;
};