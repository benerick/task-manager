export const EMAIL_ERROR_MESSAGE = "El correo electronico no es valido";
export const PASSWORD_ERROR_MESSAGE = "La contraseña es obligatoria";
export const TITLE_EMPTY_ERROR_MESSAGE = "El titulo es obligatorio";
export const TITLE_INVALID_CHARS_MESSAGE = "El titulo contiene caracteres invalidos";
export const DUPLICATED_TITLE_MESSAGE = "Ya existe una tarea con ese titulo";

const INVALID_CHARS = /[^a-zA-Z0-9\s\-\_áéíóúÁÉÍÓÚ]/;

export function validateLoginForm(email: string, password: string): string | null {
    if (!email.trim()) {
        return EMAIL_ERROR_MESSAGE;
    }
    if (!password.trim()) {
        return PASSWORD_ERROR_MESSAGE;
    }
    return null;
}

export function validateTaskForm(title: string): string | null {
    if (!title.trim()) {
        return TITLE_EMPTY_ERROR_MESSAGE;
    }

    if (INVALID_CHARS.test(title)) {
        return TITLE_INVALID_CHARS_MESSAGE;
    }

    return null;
}