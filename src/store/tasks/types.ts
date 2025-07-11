export type TaskStatus = "pending" | "in_progress" | "completed";
export type Columns = Record<TaskStatus, TasksPerColumn>;

export interface Action {
    type: string;
};

export interface Task {
    id: string;
    title: string;
    description?: string;
    favorite: boolean;
    createdAt: string;
    status: TaskStatus;
    lastModified: number;
};


export interface TasksPerColumn {
    name: string;
    tasks: Record<string, Task>;
};

export interface TaskState {
    columns: Columns;
    searchTerm: string;
    statusFilter: TaskStatus | "all";
};

export interface CacheKey {
    status: TaskStatus;
    searchTerm: string;
    statusFilter: string;
    snapshot: string;
};