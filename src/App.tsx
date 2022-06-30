import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddFormItem} from "./AddFormItem";
import {useDispatch, useSelector} from "react-redux";
import {
     addTodolistsTC,
    getTodolistsTC, TodolistsType,
} from "./state/todolistReducer";
import {StateAppType} from "./state/redux-store";
import {Dispatch} from "redux";

export const App=()=> {
    const TodolistState = useSelector<StateAppType>(state => state.todolist.todolists) as Array<TodolistsType>;
    const dispatch:Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, []);

    return (
        <div className="App">
            <AddFormItem addItem={addTodolist}/>
            {
                TodolistState.map((item) => {
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


