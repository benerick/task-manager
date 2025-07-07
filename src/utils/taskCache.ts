import { Task, TaskStatus } from "@/store/tasks/types";
import { CacheKey } from "@/store/tasks/types";
import { Columns } from "@/store/tasks/types";

let previousKey: CacheKey | null = null;
let previousResult: Task[] = [];


// Filtra tareas por estado, titulo de tarea y filtro de estado.
// Usa una cache manual para evitar recalcular si las entradas son las mismas.
export function getCachedFilteredTasks(
    status: TaskStatus,
    searchTerm: string,
    statusFilter: string,
    columns: Columns,
): Task[] {
    const snapshot = JSON.stringify(columns[status].tasks);

    const newKey: CacheKey = {
        status,
        searchTerm,
        statusFilter,
        snapshot,
    };

    if (
        previousKey &&
        previousKey.status === newKey.status &&
        previousKey.searchTerm === newKey.searchTerm &&
        previousKey.statusFilter === newKey.statusFilter &&
        previousKey.snapshot === newKey.snapshot
    ) {
        return previousResult;
    }

    const tasks = Object.values(columns[status].tasks).filter((task) => {
        if (!searchTerm && !statusFilter) return true;

        const matchesSearch = task.title.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    previousKey = newKey;
    previousResult = tasks;

    return tasks;
}
