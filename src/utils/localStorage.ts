import { TaskState } from "@/store/tasks/types";

const STORAGE_PREFIX = "tasks__";

export function saveTasksToStorage(email: string, data: TaskState) {
    try {
        const key = `${STORAGE_PREFIX}${email}`;
        const json = JSON.stringify(data);
        localStorage.setItem(key, json);
    } catch (e) {
        console.error("Error guardando tareas", e);
    }
}

export function loadTasksFromStorage(email: string): TaskState | null {
    try {
        const key = `${STORAGE_PREFIX}${email}`;
        const rawData = localStorage.getItem(key);
        if (!rawData) return null;
        return JSON.parse(rawData) as TaskState;
    } catch (e) {
        console.log("Error cargando tareas de usuario", e);
        return null;
    }
}