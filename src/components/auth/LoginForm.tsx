import styled from "styled-components";
import { ChangeEvent, useState } from 'react';
import { validateLoginForm } from "@/utils/formValidation";

interface Props {
    error: string | null;
    loading: boolean;
    onSubmit: (email: string, password: string) => void;
}

// Estilos
// Formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin-top: 2rem;
`
// Campo de text
const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`
// Boton
const Button = styled.button`
  background-color: #4dc1ea;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`
// Mensaje de error
const ErrorText = styled.p`
  color: red;
  margin: 0;
`

export default function LoginForm({ error, loading, onSubmit }: Props) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const validationError = validateLoginForm(email, password);

        if (validationError) {
            setLocalError(validationError);
            return;
        }

        setLocalError(null);
        onSubmit(email, password);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="email"
                placeholder="Correo electronico"
                value={email}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)}
            />
            <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </Button>
            {error && <ErrorText>{error}</ErrorText>}
            {localError && <ErrorText>{localError}</ErrorText>}
        </Form>
    )
}

