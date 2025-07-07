import { TaskState } from "@/store/tasks/types";
import { compressData, decompressData } from "./compression";

const STORAGE_PREFIX = "tasks__";

// Guarda las tareas del usuario en localStorage, comprimidas para ocupar menos espacio.
export function saveTasksToStorage(email: string, data: TaskState) {
    try {
        const key = `${STORAGE_PREFIX}${email}`;
        localStorage.setItem(key, compressData(data));
    } catch (e) {
        console.error("Error guardando tareas", e);
    }
}

// Carga y descomprime las tareas de un usuario desde localStorage.
export function loadTasksFromStorage(email: string): TaskState | null {
    try {
        const key = `${STORAGE_PREFIX}${email}`;
        const rawData = localStorage.getItem(key);
        if (!rawData) return null;
        return decompressData<TaskState>(rawData) as TaskState;
    } catch (e) {
        console.log("Error cargando tareas de usuario", e);
        return null;
    }
}