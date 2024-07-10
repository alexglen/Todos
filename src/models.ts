export interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
    completeTask?: (id: string) => void;
    deleteTask?: (id: string) => void;
}

export interface ITasksListProps {
    tasks: ITask[];
    completeTask?: (id: string) => void;
    deleteTask?: (id: string) => void;
}

export interface IAddNewTaskFormProps {
    addNewTask: (title: string) => void;
}

export const enum CompletionStatus {
    ALL = 'all',
    COMPLETED = 'completed',
    ACTIVE = 'active'
}

export interface IFooterAppProps {
    filter: CompletionStatus,
    tasks: ITask[];
    setFilter: (filter: CompletionStatus) => void;
    clearCompletedTasks: () => void;
}

