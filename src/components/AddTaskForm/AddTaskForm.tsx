import React, {useState, FormEvent, ChangeEvent} from 'react';
import {IAddNewTaskFormProps} from '../../models';
import './AddTaskForm.scss';

export const AddTaskForm: React.FC<IAddNewTaskFormProps> = ({addNewTask}) => {
    const [newTaskValue, setNewTaskValue] = useState<string>('');

    const createNewTask = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newTaskValue.trim()) {
            addNewTask(newTaskValue);
            setNewTaskValue('');
        } else {
            alert('Enter the name of the task!');
        }
    }

    return (
        <form onSubmit={createNewTask} role='form'>
            <input
                className='add-task-form-input'
                type='text'
                placeholder='What needs to be done?'
                value={newTaskValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTaskValue(event.target.value)}
            />
        </form>
    )
}