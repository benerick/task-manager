import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks";
import { decrypt } from "@/utils/cryptoHelpers";
import TaskBoard from "@/components/dashboard/TaskBoard";

export default function DashboardPage() {
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        const localToken = localStorage.getItem("authToken");
        if (!token && (!localToken || !decrypt(localToken))) {
            router.push("/");
        }
    }, [token]);

    return (
        <main>
            <h1>Tareas</h1>
            <TaskBoard />
        </main>
    )
}