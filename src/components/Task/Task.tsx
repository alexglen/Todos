import React from 'react';
import {ITask} from '../../models';
import './Task.scss';

export const Task: React.FC<ITask> = ({id, isCompleted, title, completeTask, deleteTask}) => {
    const classes: string[] = [];
    if (isCompleted) {
        classes.push('completed')
    }
    return (
        <li className='task'>
            <label className="checkbox-container">
                <input type="checkbox"
                       checked={isCompleted} onChange={() => completeTask?.(id)}
                />
                <span className="checkmark"></span>
                <span className={classes.join(' ,')}>{title}</span>
            </label>
            <p className='delete-icon' id='delete-icon' onClick={() => deleteTask?.(id)}>
                <svg
                    width="24"
                    height="36"
                    viewBox="0 0 20 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{fill: 'green', transition: 'fill 0.3s'}} // #90EE90 - светло-зеленый цвет
                    onMouseEnter={e => e.currentTarget.style.fill = '#FF0000'}
                    onMouseLeave={e => e.currentTarget.style.fill = 'green'}
                >
                    <path d="M3 6h14v2H3V6zm2 3h10v12H5V9zm5-4h2v2h-2V5zM7 11v8h2v-8H7zm4 0v8h2v-8h-2z"/>
                </svg>
            </p>
        </li>
    )
}