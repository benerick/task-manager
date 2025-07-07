import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSearchTerm, setStatusFilter } from "@/store/tasks/taskSlice";
import { TaskStatus } from "@/store/tasks/types";
import { FilterContainer, Input, Select } from "./styles";

export default function TaskFilters() {
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.tasks.searchTerm);
    const statusFilter = useAppSelector((state) => state.tasks.statusFilter);

    const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(evt.target.value));
    };

    const handleStatusChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setStatusFilter(evt.target.value as TaskStatus | "all"));
    };

    return (
        <FilterContainer>
            <Input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Select
                value={statusFilter}
                onChange={handleStatusChange}
            >
                <option value="all">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completado</option>
            </Select>
        </FilterContainer>
    );
}
