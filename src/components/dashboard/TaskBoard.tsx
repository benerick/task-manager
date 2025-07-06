import { useAppSelector } from "@/hooks";
import { BoardContainer } from "./styles";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
    const columns = useAppSelector((state) => state.tasks.columns);

    return (
        <BoardContainer>
            {Object.entries(columns).map(([status, column]) => (
                <TaskColumn
                    key={status}
                    status={status}
                    title={column.name}
                    tasks={Object.values(column.tasks)}
                />
            ))}
        </BoardContainer>
    )
}

export default TaskBoard