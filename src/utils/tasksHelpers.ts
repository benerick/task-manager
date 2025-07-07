import { Columns, TaskStatus } from "@/store/tasks/types";
import { createHash } from "crypto";

let titleToIdMap = new Map<string, string>();
let lastSnapshot = "";

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

export function refreshTaskTitleCache(columns: Columns) {
    const snapshot = JSON.stringify(columns);
    if (snapshot === lastSnapshot) return;

    titleToIdMap.clear();

    Object.values(columns).forEach((column) => {
        Object.values(column.tasks).forEach((task) => {
            const normalizedTitle = task.title.trim().toLowerCase();
            titleToIdMap.set(normalizedTitle, task.id);
        });
    });

    lastSnapshot = snapshot;
}

export function isDuplicated(columns: Columns, title: string, excludeTaskId?: string): boolean {
    refreshTaskTitleCache(columns);

    const normalizedTitle = title.trim().toLowerCase();
    const taskId = titleToIdMap.get(normalizedTitle);

    if (!taskId) return false;
    if (excludeTaskId && taskId === excludeTaskId) return false;

    return true;
}
