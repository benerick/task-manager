export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
    id: string;
    title: string;
    description?: string;
    favorite: boolean;
    createdAt: string;
    status: TaskStatus;
};

export interface TasksPerColumn {
    name: string;
    tasks: Record<string, Task>;
};

export interface TaskState {
    columns: Record<TaskStatus, TasksPerColumn>;
};