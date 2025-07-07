import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { BoardContainer } from "./styles";
import TaskColumn from "./TaskColumn";
import { changeTaskStatus, syncTasksFromBroadcast } from "@/store/tasks/taskSlice";
import { Task, TaskStatus } from "@/store/tasks/types";
import { findColumnByTaskId } from "@/utils/tasksHelpers";
import { getCachedFilteredTasks } from "@/utils/taskCache";
import { useEffect } from "react";
import { connectSocket } from "@/websocket/socket";


const TaskBoard = () => {
    const dispatch = useAppDispatch();
    const { columns, searchTerm, statusFilter } = useAppSelector((state) => state.tasks);

    useEffect(() => {
        connectSocket((message) => {
            console.log(message);
            if (message.type === "UPDATE_TASKS") {
                dispatch(syncTasksFromBroadcast(message.payload));
            }
        });
    }, []);


    const getTasksForStatus = (status: TaskStatus): Task[] =>
        getCachedFilteredTasks(status, searchTerm, statusFilter, columns);

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
                        tasks={getTasksForStatus(status as TaskStatus)}
                    />
                ))}
            </BoardContainer>
        </DndContext>
    )
}

export default TaskBoard