import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/todolistList/todolist/Todolist';
import {AddFormItem} from "../components/AddItemForm/AddFormItem";

import {
    addTodolistsTC,
    getTodolistsTC,
} from "../features/todolistList/todolist/todolistReducer";

import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {PositionedSnackbar} from "../components/ErrorSnackBar/SnackBar";
import {LinearIndeterminate} from "../components/linearProgress/LinearIndeterminate";


export const App = () => {
    const TodolistState = useAppSelector(state => state.todolist.todolists)
    const process =useAppSelector(state => state.application.process)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, []);

    return (
        <div style={{width: '100%'}}>
            {process&&<LinearIndeterminate/>}
            <div className="App">
                <PositionedSnackbar/>
                <AddFormItem addItem={addTodolist}/>
                {
                    TodolistState.map((item) => {
                            return <Todolist title={item.title}
                                             filter={item.filter}
                                             todolistId={item.id}
                                             isDisabled={item.isDisabled}
                                             key={item.id}

                            />
                        }
                    )
                }

            </div>
        </div>
    );
}


