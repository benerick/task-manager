import { Task } from "@/store/tasks/types";

export interface ColumnProps {
    title: string;
    status: string,
    tasks: Task[];
};

export interface CardProps {
    task: Task;
};