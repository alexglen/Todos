import React from 'react';
import {Task} from '../Task/Task';
import {ITasksListProps} from '../../models';
import './TasksList.scss';

export const TasksList: React.FC<ITasksListProps> = ({tasks, completeTask, deleteTask}) => {
    return (
        <ul className='tasks-list'>
            {tasks.length > 0 ? tasks.map(task => <Task key={task.id} {...task} completeTask={completeTask}
                                                        deleteTask={deleteTask}/>) :
                <p className='no-tasks'>There are no tasks</p>}
        </ul>
    )
}