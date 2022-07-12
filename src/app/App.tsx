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
import {Route, Routes} from "react-router-dom";

import {FormLogin} from "../features/Auth/FormikLogin/FormLogin";
import {ButtonAppBar} from "../components/BasicAppBar/ButtonAppBar";
import load from '../img/load.gif';
import {changeInitializedAppTC} from "./AppReducer";

export const App = () => {
    console.log('app render')
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeInitializedAppTC())
        dispatch(getTodolistsTC())
    }, [])
    const process = useAppSelector(state => state.application.process)
    const initializedApp = useAppSelector(state =>state.application.initializedApp)
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, []);
    console.log('initialization'+ initializedApp)
if(!initializedApp)return <div>{load}</div>
    return (
        <div style={{width: '100%'}}>
            <ButtonAppBar/>
            {process && <LinearIndeterminate/>}

            <div className="FormItem">
                <AddFormItem addItem={addTodolist}/>
            </div>
            <div className="App">
                <PositionedSnackbar/>
                <Routes>
                    <Route  path={'/'} element={<SimplePaper/>}/>
                    <Route path={'/login'} element={<FormLogin/>}/>
                </Routes>
            </div>
        </div>
    );
}


