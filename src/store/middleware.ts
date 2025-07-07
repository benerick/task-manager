import { Action, Middleware } from "@reduxjs/toolkit";
import { saveTasksToStorage } from "@/utils/localStorage";
import { sendMessage } from "@/websocket/socket";

/**
 * Middleware para mantener el estado de tareas en localStorage cada vez que
 * se despacha una acción que afecta las tareas y hay un usuario autenticado.
 */
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

/**
 * Middleware para sincronizar cambios en tareas vía WebSocket.
 * Cada vez que se despachan acciones específicas relacionadas con tareas,
 * se envía un mensaje con el estado actualizado.
 */
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