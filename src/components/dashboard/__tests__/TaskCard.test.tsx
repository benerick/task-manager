import { render, screen } from '@testing-library/react';
import TaskCard from '@/components/dashboard/TaskCard';
import { TaskStatus } from '@/store/tasks/types';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('TaskCard component', () => {
    const task = {
        id: 'task-1',
        title: 'Test tarea',
        description: 'Descripción de prueba',
        favorite: true,
        status: 'pending' as TaskStatus,
        createdAt: new Date().toISOString(),
        lastModified: Date.now(),
    };

    const renderWithProvider = (component: React.ReactElement) => {
        return render(<Provider store={store}>{component}</Provider>);
    };

    test('muestra titulo, descripcion y favorito', () => {
        renderWithProvider(<TaskCard task={task} />);

        expect(screen.getByText('Test tarea')).toBeInTheDocument();
        expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
        expect(screen.getByText('⭐')).toBeInTheDocument();
    });

    test('muestra tarea sin favorito', () => {
        const nonFavoriteTask = { ...task, favorite: false };
        renderWithProvider(<TaskCard task={nonFavoriteTask} />);
        expect(screen.queryByText('⭐')).not.toBeInTheDocument();
    });
});
