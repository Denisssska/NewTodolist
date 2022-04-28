import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddFormItem} from "./AddFormItem";
import {CustomizedList} from "./Custom";
import {useDispatch, useSelector} from "react-redux";
import {StateAppType} from "./state/redux-store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType, InitialTodolistStateType,
    removeTodolistAC
} from "./state/todolistReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTextAC,
    InitialTaskStateType,
    removeTaskAC
} from "./state/stateReducer";

function AppNew() {
    console.log('app')
    const TodolistState = useSelector<StateAppType>(state => state.todolist) as InitialTodolistStateType;
    const TaskState = useSelector<StateAppType>(state => state.tasks) as InitialTaskStateType;

    const dispatch = useDispatch();

    const changeStatus = useCallback ((taskId: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    },[dispatch]);

    const onChangeText = useCallback ((taskId: string, text: string, todolistId: string) => {
        dispatch(changeTaskTextAC(taskId, text, todolistId))
    },[dispatch]);

    const removeTask = useCallback ((id: string, todolistId: string)=> {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch]);

    const addTask = useCallback ((title: string, todolistId: string)=> {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch]);
    const removeTodolist = useCallback ((todolistId: string)=> {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch]);

    const addTodolist = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch]);
    const changeTodolistTitle = useCallback ((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    },[dispatch]);

    const changeFilter = useCallback ((value: FilterValuesType, todolistId: string)=> {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch]);

    return (
        <div className="App">
            <AddFormItem addItem={addTodolist}/>
            {
                TodolistState.map((item) => {
                    let tasksForTodolist = TaskState[item.id];

                    return <Todolist title={item.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={item.filter}
                                     todolistId={item.id}
                                     key={item.id}
                                     removeTodolist={removeTodolist}
                                     onChangeText={onChangeText}
                                     changeTodolistTitle={changeTodolistTitle}/>
                }
            )
            }
            {/*<CustomizedList/>*/}
        </div>);
}

export default AppNew;
