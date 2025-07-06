import { BoardContainer } from "./styles";
import TaskColumn from "./TaskColumn";

const columns = ["Pendiente", "En progreso", "Completado"];

const TaskBoard = () => {
    return (
        <BoardContainer>
            {columns.map((column) => (
                <TaskColumn key={column} title={column} />
            ))}
        </BoardContainer>
    )
}

export default TaskBoard