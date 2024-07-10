import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {TasksList} from './TasksList';
import {ITasksListProps, ITask} from '../../models';

const mockTasks: ITask[] = [
    {id: '1', title: 'Task 1', isCompleted: false},
    {id: '2', title: 'Task 2', isCompleted: true},
    {id: '3', title: 'Task 3', isCompleted: false},
];

describe('TasksList', () => {
    let completeTaskMock: jest.Mock;
    let deleteTaskMock: jest.Mock;
    let props: ITasksListProps;

    beforeEach(() => {
        completeTaskMock = jest.fn();
        deleteTaskMock = jest.fn();
        props = {
            tasks: mockTasks,
            completeTask: completeTaskMock,
            deleteTask: deleteTaskMock,
        };
    });

    test('renders tasks correctly', () => {
        render(<TasksList {...props} />);

        const taskElements = screen.getAllByRole('listitem');
        expect(taskElements).toHaveLength(mockTasks.length);

        // Check if the titles of tasks are rendered correctly
        mockTasks.forEach((task) => {
            expect(screen.getByText(task.title)).toBeInTheDocument();
        });
    });

    test('displays message when there are no tasks', () => {
        render(<TasksList tasks={[]} completeTask={completeTaskMock} deleteTask={deleteTaskMock}/>);

        const noTasksElement = screen.getByText('There are no tasks');
        expect(noTasksElement).toBeInTheDocument();
    });
});
