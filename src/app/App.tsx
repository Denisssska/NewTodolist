import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/todolistList/todolist/Todolist';
import {AddFormItem} from "../components/AddItemForm/AddFormItem";
import {useSelector} from "react-redux";
import {
    addTodolistsTC,
    getTodolistsTC,
} from "../features/todolistList/todolist/todolistReducer";
import {StateAppType} from "../state/redux-store";

import {TodolistsType} from "../API/TodolistApi";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export const App = () => {
    const TodolistState = useAppSelector(state => state.todolist.todolists)
    // const TodolistState = useSelector<StateAppType>(state => state.todolist.todolists) as Array<TodolistsType>;
    const dispatch = useAppDispatch();

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


