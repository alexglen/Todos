import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {FooterApp} from './FooterApp';
import {CompletionStatus, IFooterAppProps, ITask} from '../../models';

const mockTasks: ITask[] = [
    {id: '1', title: 'Task 1', isCompleted: false},
    {id: '2', title: 'Task 2', isCompleted: true},
    {id: '3', title: 'Task 3', isCompleted: false},
];

describe('FooterApp', () => {
    let setFilterMock: jest.Mock;
    let clearCompletedTasksMock: jest.Mock;
    let props: IFooterAppProps;

    beforeEach(() => {
        setFilterMock = jest.fn();
        clearCompletedTasksMock = jest.fn();
        props = {
            setFilter: setFilterMock,
            tasks: mockTasks,
            clearCompletedTasks: clearCompletedTasksMock,
            filter: CompletionStatus.ALL,
        };
    });

    test('renders correct number of active tasks', () => {
        render(<FooterApp {...props} />);

        expect(screen.getByText('2 items left')).toBeInTheDocument();
    });

    test('calls setFilter with correct argument when filter buttons are clicked', () => {
        render(<FooterApp {...props} />);

        fireEvent.click(screen.getByText('All'));
        expect(setFilterMock).toHaveBeenCalledWith(CompletionStatus.ALL);

        fireEvent.click(screen.getByText('Active'));
        expect(setFilterMock).toHaveBeenCalledWith(CompletionStatus.ACTIVE);

        fireEvent.click(screen.getByText('Completed'));
        expect(setFilterMock).toHaveBeenCalledWith(CompletionStatus.COMPLETED);
    });

    test('clearCompletedTasks is called when clear completed button is clicked', () => {
        render(<FooterApp {...props} />);

        fireEvent.click(screen.getByText('Clear completed'));
        expect(clearCompletedTasksMock).toHaveBeenCalled();
    });

    test('filter buttons are disabled when no tasks are present', () => {
        render(<FooterApp {...props} tasks={[]}/>);

        expect(screen.getByText('All')).toBeDisabled();
        expect(screen.getByText('Active')).toBeDisabled();
        expect(screen.getByText('Completed')).toBeDisabled();
        expect(screen.getByText('Clear completed')).toBeDisabled();
    });

    test('filter buttons have correct style when active', () => {
        const {rerender} = render(<FooterApp {...props} filter={CompletionStatus.ALL}/>);

        expect(screen.getByText('All')).toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Active')).not.toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Completed')).not.toHaveStyle('border: 1px solid #ccc');

        rerender(<FooterApp {...props} filter={CompletionStatus.ACTIVE}/>);
        expect(screen.getByText('All')).not.toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Active')).toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Completed')).not.toHaveStyle('border: 1px solid #ccc');

        rerender(<FooterApp {...props} filter={CompletionStatus.COMPLETED}/>);
        expect(screen.getByText('All')).not.toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Active')).not.toHaveStyle('border: 1px solid #ccc');
        expect(screen.getByText('Completed')).toHaveStyle('border: 1px solid #ccc');
    });
});