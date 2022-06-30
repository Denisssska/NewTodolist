import React, {useCallback, useEffect} from 'react';
import {AddFormItem} from "../../../components/AddItemForm/AddFormItem";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./task/Task";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC,getTaskTC} from "./task/TaskReducer";

import {
    changeTodolistFilterAC, changeTodolistTitleTC, removeTodolistTC
} from "./todolistReducer";
import {TaskType} from "../../../API/TasksApi";
import {StateAppType} from "../../../state/redux-store";
import {Dispatch} from "redux";

type FilterValuesType = "all" | "active" | "completed";
type PropsType = {
    title: string
    filter: FilterValuesType
    todolistId: string
}

export const Todolist = React.memo((props: PropsType) => {
    const TaskState = useSelector<StateAppType>(state => {
       return state.tasks.tasks.filter(item=>item.todoListId === props.todolistId)

    }) as Array<TaskType>
    const dispatch:Dispatch<any> = useDispatch();
    useEffect(()=>{
        dispatch((getTaskTC(props.todolistId)))
        return console.log('dead useEffect')
    },[props.todolistId])

    const changeFilter = useCallback((value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(value, props.todolistId))
    }, [ props.todolistId]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title,props.todolistId))

    }, [props.todolistId]);

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(props.todolistId));

    }, [props.todolistId]);

    const changeTodolistTitle = useCallback((newText:string) => {
         dispatch(changeTodolistTitleTC(props.todolistId,newText))


    }, [props.todolistId]);
    let tasksForTodolist = TaskState;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t =>t.status === 0);

    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status ===1);
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={(newText)=>changeTodolistTitle(newText)}/>
            <button onClick={removeTodolist}>delete</button>
        </h3>
        <AddFormItem addItem={(title)=>addTask(title)}/>
        <div>
            {tasksForTodolist.map(item =>{

                return <Task
                     task={item}
                    todolistId={props.todolistId}
                    key={item.id}
                />
            })}
        </div>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={()=>changeFilter('all')}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={()=>changeFilter('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={()=>changeFilter('completed')}>Completed
            </button>
        </div>
    </div>
})

