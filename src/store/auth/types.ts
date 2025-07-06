export interface AuthState {
    error: string | null;
    loading: boolean;
    token: string | null;
    user: string | null;
}