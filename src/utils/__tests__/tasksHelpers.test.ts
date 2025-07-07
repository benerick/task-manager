import { TaskStatus } from '@/store/tasks/types';
import { isDuplicated } from '@/utils/tasksHelpers';

describe('funcion isDuplicated', () => {
    const columns = {
        pending: {
            name: "Pending",
            tasks: {
                '1': {
                    id: '1',
                    title: 'Tarea 1',
                    status: 'pending' as TaskStatus,
                    favorite: false,
                    createdAt: new Date().toISOString(),
                    lastModified: Date.now(),
                },
            },
        },
        in_progress: {
            name: "En progreso",
            tasks: {}
        },
        completed: {
            name: "Completado",
            tasks: {},
        },
    };

    test('retorna true si titulo existe en cualquier columna', () => {
        expect(isDuplicated(columns, 'Tarea 1')).toBe(true);
        expect(isDuplicated(columns, 'tarea 1')).toBe(true);
    });

    test('retorna false si titulo no existe', () => {
        expect(isDuplicated(columns, 'Tarea nueva')).toBe(false);
    });

    test('excluye tarea segun el id', () => {
        expect(isDuplicated(columns, 'Tarea 1', '1')).toBe(false);
    });
});
