import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AddTaskForm} from './AddTaskForm';

describe('AddTaskForm', () => {
    let addNewTaskMock: jest.Mock;

    beforeEach(() => {
        addNewTaskMock = jest.fn();
    });

    test('renders input and form elements', () => {
        render(<AddTaskForm addNewTask={addNewTaskMock}/>);

        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        expect(inputElement).toBeInTheDocument();
    });

    test('calls addNewTask with valid task value', () => {
        render(<AddTaskForm addNewTask={addNewTaskMock}/>);

        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        const formElement = screen.getByRole('form');

        fireEvent.change(inputElement, {target: {value: 'New Task'}});
        fireEvent.submit(formElement);

        expect(addNewTaskMock).toHaveBeenCalledWith('New Task');
        expect(inputElement).toHaveValue('');
    });

    test('shows alert with empty task value', () => {
        window.alert = jest.fn();
        render(<AddTaskForm addNewTask={addNewTaskMock}/>);

        const formElement = screen.getByRole('form');

        fireEvent.submit(formElement);

        expect(window.alert).toHaveBeenCalledWith('Enter the name of the task!');
        expect(addNewTaskMock).not.toHaveBeenCalled();
    });
});
