import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";
import { CardContainer, CardTitle, CardDescription, RemoveCardButton, DraggableContainer, EditCardButton, FavoriteButton } from "./styles";
import { CardProps } from "./types";
import { useAppDispatch } from "@/hooks";
import { deleteTask, toggleFavorite } from "@/store/tasks/taskSlice";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task }: CardProps) {
    const dispatch = useAppDispatch();
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id })

    const [showModal, setShowModal] = useState<boolean>(false);

    // Aplica la transformación de posición que devuelve dnd-kit (mueve la tarea al arrastrar)
    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 9999 : undefined,
    };

    // Muestra el modal de edición y evita que el clic se propague a elementos padres
    const handleEdit = (evt: React.MouseEvent) => {
        evt.stopPropagation();

        setShowModal(true);
    };

    // Confirma eliminación con el usuario y despacha acción para borrar la tarea
    const handleDelete = (evt: React.MouseEvent) => {
        evt.stopPropagation();

        const confirmed = window.confirm("Estas seguro que deseas eliminar esta tarea?");
        if (!confirmed) return;

        dispatch(deleteTask(task));
    };

    // Cambia el estado de favorito en la tarea
    const handleToggleFavorite = () => {
        dispatch(toggleFavorite({ id: task.id, status: task.status }));
    }

    return (
        <>
            {showModal &&
                <EditTaskModal task={task} onClose={() => setShowModal(false)} />}
            <CardContainer
                ref={setNodeRef}
                style={style}
                {...attributes}

            >
                <DraggableContainer
                    {...listeners}
                >
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                </DraggableContainer>
                <FavoriteButton
                    draggable={false}
                    onClick={handleToggleFavorite}
                >
                    {task.favorite
                        ? <FaStar color="gold" />
                        : <FaRegStar />

                    }
                </FavoriteButton>
                <EditCardButton
                    draggable={false}
                    onClick={handleEdit}
                >
                    <FaEdit />
                </EditCardButton>
                <RemoveCardButton
                    draggable={false}
                    onClick={handleDelete}
                >
                    <FaTrash />
                </RemoveCardButton>
            </CardContainer>
        </>
    );
}