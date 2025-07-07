import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus, TaskState, Task } from "./types";

const initialState: TaskState = {
    columns: {
        pending: {
            name: "Pendiente",
            tasks: {},
        },
        in_progress: {
            name: "En progreso",
            tasks: {},
        },
        completed: {
            name: "Completado",
            tasks: {},
        },
    },
    searchTerm: "",
    statusFilter: "all",
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksState: (state, action: PayloadAction<TaskState>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            state.columns[task.status].tasks[task.id] = task;
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            const { status, id } = action.payload;
            delete state.columns[status].tasks[id];
        },
        editTask: (state, action: PayloadAction<{
            id: string,
            title: string,
            description: string,
            status: TaskStatus,
        }>) => {
            const { id, status, title, description } = action.payload;
            const task = state.columns[status].tasks[id]
            // Si existe, remplaza
            if (task) {
                task.title = title;
                task.description = description;
            }
        },
        changeTaskStatus: (
            state,
            action: PayloadAction<{
                id: string,
                currentStatus: TaskStatus,
                newStatus: TaskStatus,
            }>
        ) => {
            const { id, currentStatus, newStatus } = action.payload;
            const task = state.columns[currentStatus].tasks[id];
            if (!task) return;

            delete (state.columns[currentStatus].tasks[id]);
            task.status = newStatus;
            state.columns[newStatus].tasks[id] = task;
        },
        toggleFavorite: (
            state,
            action: PayloadAction<{
                id: string,
                status: TaskStatus,
            }>
        ) => {
            const { id, status } = action.payload;
            const task = state.columns[status].tasks[id];
            if (!task) return;

            task.favorite = !task.favorite;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase();
        },
        setStatusFilter: (state, action: PayloadAction<TaskStatus | "all">) => {
            state.statusFilter = action.payload;
        }
    },
});

export const {
    setTasksState,
    addTask,
    deleteTask,
    editTask,
    changeTaskStatus,
    toggleFavorite,
    setSearchTerm,
    setStatusFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
