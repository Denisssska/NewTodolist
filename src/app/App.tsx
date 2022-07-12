import React, {useEffect} from 'react';
import './App.css';

import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {PositionedSnackbar} from "../components/ErrorSnackBar/SnackBar";
import {LinearIndeterminate} from "../components/linearProgress/LinearIndeterminate";
import {SimplePaper} from "../components/Papper/SimplePaper";
import {Route, Routes} from "react-router-dom";
import {FormLogin} from "../features/Auth/FormikLogin/FormLogin";
import {ButtonAppBar} from "../components/BasicAppBar/ButtonAppBar";
import {getDataTC} from "../features/Auth/Auth-reducer";

export const App = () => {
    console.log('app render')
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getDataTC())

    }, [])
    const process = useAppSelector(state => state.application.process)

    return (
        <div style={{width: '100%'}}>
            <ButtonAppBar/>
            {process && <LinearIndeterminate/>}


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


