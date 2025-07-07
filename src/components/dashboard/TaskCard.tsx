import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CardContainer, CardTitle, CardDescription, RemoveCardButton, DraggableContainer, EditCardButton, FavoriteButton } from "./styles";
import { CardProps } from "./types";
import { useAppDispatch } from "@/hooks";
import { deleteTask, toggleFavorite } from "@/store/tasks/taskSlice";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task }: CardProps) {
    const dispatch = useAppDispatch();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

    const [showModal, setShowModal] = useState<boolean>(false);
    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    const handleEdit = (evt: React.MouseEvent) => {
        evt.stopPropagation();

        setShowModal(true);
    };

    const handleDelete = (evt: React.MouseEvent) => {
        evt.stopPropagation();

        const confirmed = window.confirm("Estas seguro que deseas eliminar esta tarea?");
        if (!confirmed) return;

        dispatch(deleteTask(task));
    };

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
                        ? <span>⭐</span>
                        : <span>☆</span>
                    }
                </FavoriteButton>
                <EditCardButton
                    draggable={false}
                    onClick={handleEdit}
                >
                    Edit
                </EditCardButton>
                <RemoveCardButton
                    draggable={false}
                    onClick={handleDelete}
                >
                    x
                </RemoveCardButton>
            </CardContainer>
        </>
    );
}