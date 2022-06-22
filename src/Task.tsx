import React, {useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {changeTaskStatusAC, changeTaskTextAC, removeTaskAC} from "./state/stateReducer";
import {useDispatch} from "react-redux";
import {tasksAPI, TaskType} from "./API/TasksApi";

type TaskPropsType = {
    todolistId: string
    // task: TaskType
    taskId:string
    status:number
    taskTitle:string

}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTask = useCallback(() => {
        tasksAPI.deleteTasks(props.todolistId, props.taskId).then((res) => {
            dispatch(removeTaskAC(props.taskId, props.todolistId))
        })

    }, [props.todolistId, props.taskId]);
    let a:number ;
    props.status===0? a = 1 : a = 0

    const changeStatus = useCallback(() => {
       tasksAPI.updateTask(props.taskId,props.taskTitle,a, props.todolistId).then((item) => {
           console.log(item.data.data.item.status)
           dispatch(changeTaskStatusAC(props.taskId, a, props.todolistId))
        })
    }, [props.taskId,props.status, props.todolistId]);

    const onChangeText = useCallback((text: string) => {
        tasksAPI.updateTask(props.taskId, text,props.status, props.todolistId).then((item) => {
            dispatch(changeTaskTextAC(props.taskId, text, props.todolistId))
        })
    }, [props.taskId, props.todolistId]);

    return <div key={props.taskId} className={props.status === 1 ? "is-done" : ""}>

        <input
            type='checkbox'
            onChange={changeStatus}
            checked={!! props.status}
        />
        <EditableSpan title={props.taskTitle} onChange={(text) => onChangeText(text)}/>
        <button onClick={removeTask}>delete</button>
    </div>
});

