import { ColumnContainer, ColumnTitle, TaskList } from "./styles";
import TaskCard from "./TaskCard";
import { ColumnProps } from "./types";

export default function TaskColumn({ title }: ColumnProps) {
    return (
        <ColumnContainer>
            <ColumnTitle>{title}</ColumnTitle>
            <TaskList>
                <TaskCard
                    title="tarea de ejemplo"
                    description="Descripcion"
                />
            </TaskList>
        </ColumnContainer>
    );
}