import { Action, Middleware } from "@reduxjs/toolkit";
import { saveTasksToStorage } from "@/utils/localStorage";


const persistTasksMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const act = action as Action;
    const user = storeAPI.getState().auth.user;

    if (user && act.type.startsWith("tasks")) {
        const tasksState = storeAPI.getState().tasks;
        saveTasksToStorage(user, tasksState);
    }

    return result;
}

export default persistTasksMiddleware;