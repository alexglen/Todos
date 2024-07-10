import React, {useEffect, useState} from 'react';
import {AddTaskForm} from '../AddTaskForm/AddTaskForm';
import {FooterApp} from '../FooterApp/FooterApp';
import {TasksList} from '../TasksList/TasksList';
import {CompletionStatus, ITask} from '../../models';
import {uid} from 'uid';
import './App.scss';

export const App = () => {
    const defaultTasks = JSON.parse(localStorage.getItem('tasks') || '');
    const [tasks, setTasks] = useState<ITask[]>(defaultTasks);
    const [filter, setFilter] = useState<CompletionStatus>(CompletionStatus.ALL);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addNewTask = (title: string) => {
        const newTask: ITask = {title, id: uid(), isCompleted: false};
        setTasks(tasks => [...tasks, newTask]);
    }

    const completeTask = (id: string) => {
        const completedTaskIndex = tasks.findIndex(task => task.id === id);
        setTasks(tasks => [...tasks.slice(0, completedTaskIndex),
            {...tasks[completedTaskIndex], isCompleted: !tasks[completedTaskIndex].isCompleted},
            ...tasks.slice(completedTaskIndex + 1)])
    }

    const clearCompletedTasks = () => {
        setTasks(tasks => tasks.map(task => ({...task, isCompleted: false})));
    }

    const deleteTask = (id: string) => {
        setTasks(tasks => [...tasks.filter(task => task.id !== id)]);
    }

    const filteredTasks = (filter: CompletionStatus, tasks: ITask[]) => {
        switch (filter) {
            case CompletionStatus.COMPLETED:
                return tasks.filter(task => task.isCompleted)
            case CompletionStatus.ACTIVE:
                return tasks.filter(task => !task.isCompleted)
            case CompletionStatus.ALL:
            default:
                return tasks;
        }
    }

    return (
        <div className='app-container'>
            <header className='logo'>todos</header>
            <AddTaskForm addNewTask={addNewTask}/>
            <TasksList tasks={filteredTasks(filter, tasks)} completeTask={completeTask} deleteTask={deleteTask}/>
            <FooterApp setFilter={setFilter} tasks={tasks} clearCompletedTasks={clearCompletedTasks} filter={filter}/>
        </div>
    )
}