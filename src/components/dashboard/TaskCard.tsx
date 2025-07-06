import { CardContainer, CardTitle, CardDescription } from "./styles";
import { CardProps } from "./types";

export default function TaskCard({ title, description }: CardProps) {
    return (
        <CardContainer>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardContainer>
    );
}