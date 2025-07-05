export function validateLoginForm(email: string, password: string): string | null {
    if (!email.trim()) {
        return "El correo electronico no es valido";
    }
    if (!password.trim()) {
        return "La contraseña es obligatoria";
    }
    return null;
}