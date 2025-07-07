import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./auth/authSlice";
import taskReduce from "./tasks/taskSlice";
import { persistTasksMiddleware, websocketMiddleware } from "./middleware";

// Configura el store de Redux con reducers y middlewares personalizados.
export const store = configureStore({
    reducer: {
        auth: authReduce,
        tasks: taskReduce,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistTasksMiddleware, websocketMiddleware),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>