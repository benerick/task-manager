export const EMAIL_ERROR_MESSAGE = "El correo electronico no es valido";
export const PASSWORD_ERROR_MESSAGE = "La contraseña es obligatoria";

export function validateLoginForm(email: string, password: string): string | null {
    if (!email.trim()) {
        return EMAIL_ERROR_MESSAGE;
    }
    if (!password.trim()) {
        return PASSWORD_ERROR_MESSAGE;
    }
    return null;
}