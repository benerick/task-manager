import { useDraggable } from "@dnd-kit/core";
import { CardContainer, CardTitle, CardDescription } from "./styles";
import { CardProps } from "./types";

export default function TaskCard({ task }: CardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    }

    return (
        <CardContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {task.favorite && <span>⭐</span>}
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
        </CardContainer>
    );
}