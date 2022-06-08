import React, { useCallback} from 'react';
import {AddFormItem} from "./AddFormItem";
import {EditableSpan} from "./EditableSpan";
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import { IconButton} from "@mui/material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type FilterValuesType = "all" | "active" | "completed";
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    onChangeText: (taskId: string, text: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist')
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistId),[props.changeFilter,props.todolistId]);
    const onActiveClickHandler = useCallback (() => props.changeFilter("active", props.todolistId),[props.changeFilter,props.todolistId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistId),[props.changeFilter]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId]);
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.changeTodolistTitle, props.todolistId])
    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label='delete' size='small' onClick={removeTodolist}><Delete
                fontSize='small'/></IconButton>
        </h3>
        <AddFormItem addItem={addTask}/>
        <div>
            {tasksForTodolist.map(item => <Task
                changeTaskStatus={props.changeTaskStatus}
                onChangeText={props.onChangeText}
                removeTask={props.removeTask} task={item}
                todolistId={props.todolistId}
                key={item.id}
            />)}
        </div>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})

