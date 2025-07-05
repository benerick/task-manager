import {
    validateLoginForm,
    EMAIL_ERROR_MESSAGE,
    PASSWORD_ERROR_MESSAGE
} from "../formValidation";

describe("validateLoginForm", () => {

    // Prueba de correo vacio
    it("debe mostrar error si el campo de email esta vacio", () => {
        const result = validateLoginForm("", "1234");
        expect(result).toBe(EMAIL_ERROR_MESSAGE);
    });

    // Prueba de contraseña vacia
    it("debe mostrar error si el campo de contraseña esta vacio", () => {
        const result = validateLoginForm("test@email.com", "");
        expect(result).toBe(PASSWORD_ERROR_MESSAGE);
    });

    // Prueba de campos validos
    it("debe retornar error vacio si todos los campos tienen valor", () => {
        const result = validateLoginForm("test@email.com", "1234");
        expect(result).toBe(null);
    });

    // Prueba de ambos campos vacios
    // Muestra error de correo por ser el primer campo
    it("debe mostrar error de correo invalid si todos los campos estan vacios", () => {
        const result = validateLoginForm("", "");
        expect(result).toBe(EMAIL_ERROR_MESSAGE);
    });
});
