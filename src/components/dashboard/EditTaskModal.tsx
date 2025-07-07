import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editTask } from "@/store/tasks/taskSlice";
import { isDuplicated } from "@/utils/tasksHelpers";
import { EditModalProps } from "./types";
import { ButtonGroup, ErrorText, ModalContainer, Overlay } from "./styles";

export default function EditTaskModal({ task, onClose }: EditModalProps) {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description || "");
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();
    const columns = useAppSelector((state) => state.tasks.columns);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isDuplicate = isDuplicated(columns, title, task.id);
        if (isDuplicate) {
            setError("Ya existe una tarea con ese título.");
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
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </ButtonGroup>
                </form>
            </ModalContainer>
        </Overlay>
    );
}