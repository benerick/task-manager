import { configureStore } from "@reduxjs/toolkit";
import authReduce from "@/features/auth/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReduce,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>