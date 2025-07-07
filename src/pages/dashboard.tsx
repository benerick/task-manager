import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { decrypt } from "@/utils/cryptoHelpers";
import TaskBoard from "@/components/dashboard/TaskBoard";
import TaskForm from "@/components/dashboard/TaskForm";
import { loadTasksFromStorage } from "@/utils/localStorage";
import { setTasksState } from "@/store/tasks/taskSlice";
import TaskFilters from "@/components/dashboard/TaskFilter";
import { Header, Title } from "@/styles/styles";

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return;

        const storedTasks = loadTasksFromStorage(user);
        if (storedTasks) {
            dispatch(setTasksState(storedTasks));
        }
    }, [user]);

    useEffect(() => {
        const localToken = localStorage.getItem("authToken");
        if (!token && (!localToken || !decrypt(localToken))) {
            router.push("/");
        }
    }, [token]);

    return (
        <main>

            <Header>
                <Title>Tareas</Title>
                <TaskForm />
                <TaskFilters />
            </Header>
            <TaskBoard />
        </main>
    )
}