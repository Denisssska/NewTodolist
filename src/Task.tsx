import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@mui/material";
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    onChangeText: (taskId: string, text: string, todolistId: string) => void
    todolistId: string
    task: TaskType

}
export const Task = React.memo( (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    }
    const onChangeText = useCallback((text: string) => {
        props.onChangeText(props.task.id, text, props.todolistId)
    },[ props.onChangeText,props.task.id,props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

        <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}
                  onChange={onChangeHandler}
                  checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeText}/>
        <IconButton aria-label='delete' size='small' onClick={onClickHandler}><Delete
            fontSize='small'/></IconButton>
    </div>
});

