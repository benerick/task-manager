import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { BoardContainer } from "./styles";
import TaskColumn from "./TaskColumn";
import { changeTaskStatus } from "@/store/tasks/taskSlice";
import { TaskStatus } from "@/store/tasks/types";
import { findColumnByTaskId } from "@/utils/tasksHelpers";

const TaskBoard = () => {
    const dispatch = useAppDispatch();
    const columns = useAppSelector((state) => state.tasks.columns);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const currentColumn = findColumnByTaskId(active.id as string, columns);
        if (!currentColumn) return;
        dispatch(changeTaskStatus({
            id: active.id as string,
            currentStatus: currentColumn,
            newStatus: over.id as TaskStatus,
        }));
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <BoardContainer>
                {Object.entries(columns).map(([status, column]) => (
                    <TaskColumn
                        key={status}
                        id={status}
                        status={status}
                        title={column.name}
                        tasks={Object.values(column.tasks)}
                    />
                ))}
            </BoardContainer>
        </DndContext>
    )
}

export default TaskBoard