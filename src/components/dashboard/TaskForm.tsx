import { useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addTask } from "@/store/tasks/taskSlice";
import { generateUniqueId, isDuplicated, refreshTaskTitleCache } from "@/utils/tasksHelpers";
import { Task, TaskStatus } from "@/store/tasks/types";
import { FormContainer, Input, Button, Select, ErrorText } from "./styles";
import { DUPLICATED_TITLE_MESSAGE, validateTaskForm } from "@/utils/formValidation";

export default function TaskForm() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const columns = useAppSelector((state) => state.tasks.columns);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<TaskStatus>("pending");
    const [error, setError] = useState("");

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        // Validar titulo
        const error = validateTaskForm(title);

        if (error) {
            setError(error);
            return;
        }

        // Validar duplicado
        if (isDuplicated(columns, title)) {
            setError(DUPLICATED_TITLE_MESSAGE)
            return;
        }

        const newTask: Task = {
            id: generateUniqueId(user),
            title: title.trim(),
            description: description.trim(),
            favorite: false,
            createdAt: new Date().toISOString(),
            status,
        };

        dispatch(addTask(newTask));

        // Limpiar campos
        setTitle("");
        setDescription("");
        setError("");
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Titulo de la tarea"
                value={title}
                onChange={
                    (evt: ChangeEvent<HTMLInputElement>) =>
                        setTitle(evt.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Descripcion"
                value={description}
                onChange={
                    (evt: ChangeEvent<HTMLInputElement>) =>
                        setDescription(evt.target.value)
                }
            />
            <Select
                value={status}
                onChange={
                    (evt: ChangeEvent<HTMLSelectElement>) =>
                        setStatus(evt.target.value as TaskStatus)
                }
            >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completado</option>
            </Select>
            <Button type="submit">Crear tarea</Button>
            {error && <ErrorText>{error}</ErrorText>}
        </FormContainer>
    );
}

