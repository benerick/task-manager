import { Columns, TaskStatus } from "@/store/tasks/types";
import { createHash } from "crypto";

export function generateUniqueId(user: string | null): string {
    const timestamp = new Date().toISOString;
    const raw = `${user}_${timestamp}`;
    const hash = createHash("sha256").update(raw).digest("hex");
    return `${user ?? "anon"}_${Date.now()}_${hash.substring(0, 8)}`;
};

export function findColumnByTaskId(taskId: string, columns: Columns): TaskStatus | null {
    for (const [key, column] of Object.entries(columns)) {
        if (column.tasks[taskId]) return key as TaskStatus;
    }
    return null;
}

export function isDuplicated(columns: Columns, title: string, excludeTaskId?: string): boolean {
    const normalizedTitle = title.trim().toLowerCase();

    return Object.values(columns).some((column) =>
        Object.values(column.tasks).some((task) => {
            if (excludeTaskId && task.id === excludeTaskId) return false;
            return task.title.trim().toLowerCase() === normalizedTitle
        })
    )
}
