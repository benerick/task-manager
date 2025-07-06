import { ColumnContainer, ColumnTitle, TaskList } from "./styles";
import TaskCard from "./TaskCard";
import { ColumnProps } from "./types";

export default function TaskColumn({ title, tasks }: ColumnProps) {
    return (
        <ColumnContainer>
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