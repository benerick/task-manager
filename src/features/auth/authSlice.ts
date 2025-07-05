import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { generateDynamicKey, simulateLatency } from "@/utils/authHelpers";
import { config } from "@/config";

interface AuthState {
    error: string | null;
    loading: boolean;
    token: string | null;
    user: string | null;
}

const initialState: AuthState = {
    error: null,
    loading: false,
    token: null,
    user: null,
}

export const login = createAsyncThunk<
    { token: string; email: string },
    { email: string; password: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        // Manejo de login con validaciones 
        // Simulacion de latencia
        await simulateLatency();
        // Creacion de clave dinamica
        const dynamicKey = generateDynamicKey(email);
        // Llamada a ReqRes API
        const response = await axios.post(`${config.apiBaseUrl}/login`,
            {
                email,
                password,
                key: dynamicKey,
            }, {
            headers: {
                "x-api-key": config.reqresApiKey,
            },
        },
        )

        return {
            token: response.data.token,
            email,
        };

    } catch (err: any) {
        return rejectWithValue("Las credenciales son invalidas");
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("session");
        },
        restoreSession(state, action: PayloadAction<{ token: string; email: string }>) {
            state.user = action.payload.email;
            state.token = action.payload.token;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.email;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;