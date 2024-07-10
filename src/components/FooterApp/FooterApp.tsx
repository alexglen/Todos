import React from 'react';
import {CompletionStatus, IFooterAppProps} from '../../models';
import './FooterApp.scss';

export const FooterApp: React.FC<IFooterAppProps> = ({setFilter, tasks, clearCompletedTasks, filter}) => {
    const activeTasksNumber = tasks.filter(task => !task.isCompleted).length;

    return (
        <footer className='footer'>
            <div className='tasks-number'>{`${activeTasksNumber} items left`}</div>
            <div className='filter-buttons'>
                <button onClick={() => setFilter(CompletionStatus.ALL)}
                        disabled={tasks.length === 0}
                        style={{border: filter === CompletionStatus.ALL ? '1px solid #ccc' : 'none'}}>All
                </button>
                <button onClick={() => setFilter(CompletionStatus.ACTIVE)}
                        disabled={tasks.length === 0}
                        style={{border: filter === CompletionStatus.ACTIVE ? '1px solid #ccc' : 'none'}}>Active
                </button>
                <button onClick={() => setFilter(CompletionStatus.COMPLETED)}
                        disabled={tasks.length === 0}
                        style={{border: filter === CompletionStatus.COMPLETED ? '1px solid #ccc' : 'none'}}>Completed
                </button>
            </div>
            <div>
                <button onClick={() => clearCompletedTasks()} className='clear-completed-button'
                        disabled={tasks.length === 0}>
                    Clear completed
                </button>
            </div>
        </footer>
    )
}