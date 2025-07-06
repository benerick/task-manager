import { useDraggable } from "@dnd-kit/core";
import { CardContainer, CardTitle, CardDescription, RemoveCardButton, DraggableContainer } from "./styles";
import { CardProps } from "./types";
import { useAppDispatch } from "@/hooks";
import { deleteTask } from "@/store/tasks/taskSlice";

export default function TaskCard({ task }: CardProps) {
    const dispatch = useAppDispatch();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    const handleDelete = (evt: React.MouseEvent) => {
        evt.stopPropagation();

        const confirmed = window.confirm("Estas seguro que deseas eliminar esta tarea?");
        if (!confirmed) return;

        dispatch(deleteTask(task));
    };

    return (
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
            <RemoveCardButton
                draggable={false}
                onClick={handleDelete}
            >
                x
            </RemoveCardButton>
            {task.favorite && <span>⭐</span>}
        </CardContainer>
    );
}