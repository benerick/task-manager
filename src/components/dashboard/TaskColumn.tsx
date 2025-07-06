import { useDroppable } from "@dnd-kit/core";
import { ColumnContainer, ColumnTitle, TaskList } from "./styles";
import TaskCard from "./TaskCard";
import { ColumnProps } from "./types";

export default function TaskColumn({ id, title, tasks }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <ColumnContainer ref={setNodeRef}>
            <ColumnTitle>{title}</ColumnTitle>
            <TaskList>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))}
            </TaskList>
        </ColumnContainer>
    );
}