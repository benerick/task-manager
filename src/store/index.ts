import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./auth/authSlice";
import taskReduce from "./tasks/taskSlice";


export const store = configureStore({
    reducer: {
        auth: authReduce,
        tasks: taskReduce,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>