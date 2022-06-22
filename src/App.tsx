import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddFormItem} from "./AddFormItem";

import {useDispatch, useSelector} from "react-redux";

import {
    addTodolistAC,
     getTodolistsTC, TodolistsType,
} from "./state/todolistReducer";
import {todolistAPI} from "./API/TodolistApi";
import {StateAppType} from "./state/redux-store";





export const App=()=> {
    const TodolistState = useSelector<StateAppType>(state => state.todolist.todolists) as Array<TodolistsType>;
    const dispatch = useDispatch();

    useEffect(() => {

        // @ts-ignore
        dispatch(getTodolistsTC())
    }, [])


    const addTodolist = useCallback((title: string) => {
        todolistAPI.createTodolist(title).then((item) => {
           // console.log(item)
            dispatch(addTodolistAC(item.title, item.id, item.addedDate, item.order))
        })
    }, []);

    return (
        <div className="App">
            <AddFormItem addItem={addTodolist}/>
            {
                TodolistState.map((item) => {
                        // let tasksForTodolist = TaskState[item.id];

                        return <Todolist title={item.title}
                                         filter={item.filter}
                                         todolistId={item.id}
                                         key={item.id}
                        />
                    }
                )
            }

        </div>);
}


