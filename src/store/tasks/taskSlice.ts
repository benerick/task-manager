import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus, TaskState, Task, Columns } from "./types";

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
        // Reemplaza todo el estado de tareas (útil para sincronización o carga inicial)
        setTasksState: (_state, action: PayloadAction<TaskState>) => {
            return action.payload;
        },
        // Agrega una tarea nueva en la columna correspondiente según su estado
        addTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            state.columns[task.status].tasks[task.id] = task;

        },
        // Elimina una tarea dado su ID y estado
        deleteTask: (state, action: PayloadAction<Task>) => {
            const { status, id } = action.payload;
            delete state.columns[status].tasks[id];

        },
        // Edita título y descripción de una tarea existente, actualizando la fecha de modificación
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
                task.lastModified = Date.now();
            }
        },
        // Cambia el estado (columna) de una tarea y la mueve a la nueva columna
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
        // Activa o desactiva el estado "favorito" de una tarea
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
        // Actualiza el término de búsqueda para filtrar tareas por título (convierte a minúsculas)
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase();
        },
        // Cambia el filtro de estado para mostrar tareas específicas o todas
        setStatusFilter: (state, action: PayloadAction<TaskStatus | "all">) => {
            state.statusFilter = action.payload;
        },
        // Sincroniza el estado de tareas desde un broadcast externo (ej: WebSocket)
        syncTasksFromBroadcast: (state, action: PayloadAction<TaskState>) => {
            state.columns = action.payload.columns;
        },
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
    syncTasksFromBroadcast,
} = taskSlice.actions;

export default taskSlice.reducer;
