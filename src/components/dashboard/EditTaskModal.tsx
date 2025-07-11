import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editTask } from "@/store/tasks/taskSlice";
import { isDuplicated } from "@/utils/tasksHelpers";
import { EditModalProps } from "./types";
import { Button, ButtonGroup, ErrorText, ModalContainer, Overlay } from "./styles";
import { DUPLICATED_TITLE_MESSAGE, validateTaskForm } from "@/utils/formValidation";

export default function EditTaskModal({ task, onClose }: EditModalProps) {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description || "");
    const [error, setError] = useState<string>("");
    const [initialVersion, setInitialVersion] = useState<number>(task.lastModified);

    const dispatch = useAppDispatch();
    const columns = useAppSelector((state) => state.tasks.columns);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const error = validateTaskForm(title);
        if (error) {
            setError(error);
            return;
        }

        const isDuplicate = isDuplicated(columns, title, task.id);
        if (isDuplicate) {
            setError(DUPLICATED_TITLE_MESSAGE);
            return;
        }

        // Bloqueo optimista
        const latestTask = columns[task.status].tasks[task.id];

        if (latestTask.lastModified !== initialVersion) {
            setError("La tarea fue modificada por otro usuario u otra pestaña.")
            return;
        }

        dispatch(editTask({
            id: task.id,
            status: task.status,
            title,
            description,
        }));

        onClose();
    };

    return (
        <Overlay>
            <ModalContainer>
                <h2>Editar tarea</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {error && <ErrorText>{error}</ErrorText>}
                    <ButtonGroup>
                        <Button type="submit">Guardar</Button>
                        <Button type="button" onClick={onClose}>Cancelar</Button>
                    </ButtonGroup>
                </form>
            </ModalContainer>
        </Overlay>
    );
}