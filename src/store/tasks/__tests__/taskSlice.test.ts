import tasksReducer, {
    addTask,
    editTask,
    deleteTask,
    changeTaskStatus
} from '@/store/tasks/taskSlice';

import { TaskState, TaskStatus } from '../types';

describe('taskSlice reducer', () => {
    let initialState: TaskState;

    beforeEach(() => {
        initialState = {
            columns: {
                pending: {
                    tasks: {},
                    name: ''
                },
                in_progress: {
                    tasks: {},
                    name: ''
                },
                completed: {
                    tasks: {},
                    name: ''
                },
            },
            searchTerm: "",
            statusFilter: "all",
        };
    });

    test('agregar tarea', () => {
        const task = {
            id: 'tarea-1',
            title: 'Tarea nueva',
            description: '',
            status: 'pending' as TaskStatus,
            favorite: false,
            createdAt: new Date().toISOString(),
            lastModified: Date.now(),
        };

        const newState = tasksReducer(initialState, addTask(task));
        expect(newState.columns.pending.tasks['tarea-1']).toEqual(task);
    });

    test('editar tarea', () => {
        jest.spyOn(Date, 'now').mockReturnValue(1720000000000);
        const preloadedState = tasksReducer(initialState, addTask({
            id: 'tarea-1',
            title: 'Tarea vieja',
            description: '',
            status: 'pending' as TaskStatus,
            favorite: false,
            createdAt: '',
            lastModified: 0,
        }));

        const editedTask = {
            id: 'tarea-1',
            title: 'Tarea editada',
            description: 'Con descripción',
            status: 'pending' as TaskStatus,
            favorite: false,
            createdAt: '',
        };

        const newState = tasksReducer(preloadedState, editTask(editedTask));
        expect(newState.columns.pending.tasks['tarea-1'].title).toBe("Tarea editada");

        jest.restoreAllMocks();
    });

    test('borrar tarea', () => {
        const preloadedState = tasksReducer(initialState, addTask({
            id: 'tarea-1',
            title: 'Para borrar',
            description: '',
            status: 'pending' as TaskStatus,
            favorite: false,
            createdAt: '',
            lastModified: 0
        }));

        const newState = tasksReducer(preloadedState, deleteTask({
            id: 'tarea-1',
            status: 'pending' as TaskStatus,
            title: '',
            favorite: false,
            createdAt: '',
            lastModified: 0
        }));
        expect(newState.columns.pending.tasks['tarea-1']).toBeUndefined();
    });

    test('cambiar el status de la tarea', () => {
        const preloadedState = tasksReducer(initialState, addTask({
            id: 'tarea-1',
            title: 'Mover estado',
            description: '',
            status: 'pending' as TaskStatus,
            favorite: false,
            createdAt: '',
            lastModified: 0
        }));

        const newState = tasksReducer(preloadedState, changeTaskStatus({
            id: 'tarea-1',
            currentStatus: 'pending',
            newStatus: 'completed',
        }));

        expect(newState.columns.pending.tasks['tarea-1']).toBeUndefined();
        expect(newState.columns.completed.tasks['tarea-1'].status).toBe('completed');
    });
});
