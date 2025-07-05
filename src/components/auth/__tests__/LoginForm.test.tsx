import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from "../../../utils/formValidation";

describe("LoginForm", () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        mockSubmit.mockReset();
    });

    it("renderiza el formulario de login", () => {
        render(<LoginForm loading={false} error={null} onSubmit={mockSubmit} />);
        expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    });

    it("muestra error de email si el campo de email esta vacio", () => {
        render(<LoginForm loading={false} error={null} onSubmit={mockSubmit} />);
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(EMAIL_ERROR_MESSAGE)).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("muestra error de password si el campo de password esta vacio", () => {
        render(<LoginForm loading={false} error={null} onSubmit={mockSubmit} />);
        fireEvent.change(screen.getByPlaceholderText(/correo/i), {
            target: { value: "test@email.com" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(PASSWORD_ERROR_MESSAGE)).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("llama a la funcion onSubmit si los datos son validos", () => {
        render(<LoginForm loading={false} error={null} onSubmit={mockSubmit} />);
        fireEvent.change(screen.getByPlaceholderText(/correo/i), {
            target: { value: "test@email.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(mockSubmit).toHaveBeenCalledWith("test@email.com", "123456");
    });

    it("muestra el text de Entrando... cuando el valor de loading es true", () => {
        render(<LoginForm loading={true} error={null} onSubmit={mockSubmit} />);
        expect(screen.getByRole("button")).toHaveTextContent(/Entrando.../i);
        expect(screen.getByRole("button")).toBeDisabled();
    });
})