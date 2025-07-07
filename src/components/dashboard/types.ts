import { Task } from "@/store/tasks/types";

export interface ColumnProps {
    id: string;
    title: string;
    status: string,
    tasks: Task[];
};

export interface CardProps {
    task: Task;
};

export interface EditModalProps {
    task: Task;
    onClose: () => void;
};