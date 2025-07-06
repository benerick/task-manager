import { CardContainer, CardTitle, CardDescription } from "./styles";
import { CardProps } from "./types";

export default function TaskCard({ task }: CardProps) {
    return (
        <CardContainer>
            {task.favorite && <span>⭐</span>}
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
        </CardContainer>
    );
}