import React, {useCallback, useEffect} from 'react';
import {AddFormItem} from "./AddFormItem";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, getTaskAC} from "./state/stateReducer";
import {todolistAPI} from "./API/TodolistApi";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistReducer";
import {tasksAPI, TaskType} from "./API/TasksApi";
import {StateAppType} from "./state/redux-store";



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
    const dispatch = useDispatch();
    useEffect(()=>{
        tasksAPI.getTasks(props.todolistId).then((items)=>{
             dispatch(getTaskAC(items.data.items))
        })
        return console.log('dead useEffect')
    },[props.todolistId])
    const changeFilter = useCallback((value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(value, props.todolistId))
    }, [ props.todolistId]);

    const addTask = useCallback((title: string) => {
        tasksAPI.createTasks(title,props.todolistId).then((items)=>{

             dispatch(addTaskAC(items.data.data.item,props.todolistId))
        })
    }, [props.todolistId]);

    const removeTodolist = useCallback(() => {
        todolistAPI.deleteTodolist(props.todolistId).then((data)=>{
            dispatch(removeTodolistAC(props.todolistId))
        })
    }, [props.todolistId]);
    const changeTodolistTitle = useCallback((newText:string) => {
        todolistAPI.updateTodolist(props.todolistId,newText).then((res)=>{
            dispatch(changeTodolistTitleAC(props.todolistId, newText))
        })

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
                    // task={item}
                    taskId={item.id}
                    taskTitle={item.title}
                    status={item.status}
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

