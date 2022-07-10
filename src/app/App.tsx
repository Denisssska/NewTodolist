import React, {useCallback, useEffect} from 'react';
import './App.css';

import {AddFormItem} from "../components/AddItemForm/AddFormItem";

import {
    addTodolistsTC,
    getTodolistsTC,
} from "../features/todolistList/todolist/todolistReducer";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {PositionedSnackbar} from "../components/ErrorSnackBar/SnackBar";
import {LinearIndeterminate} from "../components/linearProgress/LinearIndeterminate";
import {SimplePaper} from "../components/Papper/SimplePaper";


export const App = React.memo(() => {
    console.log('app render')
    const TodolistState = useAppSelector(state => state.todolist.todolists)
    const process = useAppSelector(state => state.application.process)
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, []);

    return (
        <div style={{width: '100%'}}>
            {process && <LinearIndeterminate/>}
            <div className="FormItem">
                <AddFormItem addItem={addTodolist}/>
            </div>
            <div className="App">
                <PositionedSnackbar/>
                {/*<AddFormItem addItem={addTodolist}/>*/}
                {
                    TodolistState.map((item) => {
                            return <SimplePaper
                                item={item}
                                key={item.id}
                            />
                        }
                    )
                }

            </div>
        </div>
    );
})


