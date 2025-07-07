import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { BoardContainer } from "./styles";
import TaskColumn from "./TaskColumn";
import { changeTaskStatus } from "@/store/tasks/taskSlice";
import { Task, TaskStatus } from "@/store/tasks/types";
import { findColumnByTaskId } from "@/utils/tasksHelpers";

const TaskBoard = () => {
    const dispatch = useAppDispatch();
    const { columns, searchTerm, statusFilter } = useAppSelector((state) => state.tasks);

    const getFilteredTasks = (status: TaskStatus): Task[] => {
        const tasks = Object.values(columns[status].tasks);
        if (!searchTerm && !statusFilter) return tasks;
        return tasks.filter((task) => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === "all" || task.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    };

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
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <BoardContainer>
                {Object.entries(columns).map(([status, column]) => (
                    <TaskColumn
                        key={status}
                        id={status}
                        status={status}
                        title={column.name}
                        tasks={getFilteredTasks(status as TaskStatus)}
                    />
                ))}
            </BoardContainer>
        </DndContext>
    )
}

export default TaskBoard