// Mensajes de error reutilizables para validación de formularios
export const EMAIL_ERROR_MESSAGE = "El correo electronico no es valido";
export const PASSWORD_ERROR_MESSAGE = "La contraseña es obligatoria";
export const TITLE_EMPTY_ERROR_MESSAGE = "El titulo es obligatorio";
export const TITLE_INVALID_CHARS_MESSAGE = "El titulo contiene caracteres invalidos";
export const DUPLICATED_TITLE_MESSAGE = "Ya existe una tarea con ese titulo";

// Expresión regular para detectar caracteres inválidos en un título.
// Permite letras, números, espacios, guiones, guiones bajos y letras con acento.
const INVALID_CHARS = /[^a-zA-Z0-9\s\-\_áéíóúÁÉÍÓÚ]/;

// Valida los campos de un formulario de login.
export function validateLoginForm(email: string, password: string): string | null {
    // Aqui se usa trim para verificar si el email está vacío (ignorando espacios)
    if (!email.trim()) {
        return EMAIL_ERROR_MESSAGE;
    }
    if (!password.trim()) {
        return PASSWORD_ERROR_MESSAGE;
    }
    return null;
}

// Valida el campo 'título' de una tarea.
export function validateTaskForm(title: string): string | null {
    if (!title.trim()) {
        return TITLE_EMPTY_ERROR_MESSAGE;
    }

    if (INVALID_CHARS.test(title)) {
        return TITLE_INVALID_CHARS_MESSAGE;
    }

    return null;
}