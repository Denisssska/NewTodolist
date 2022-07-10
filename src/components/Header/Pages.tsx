import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {App} from "../../app/App";
import {HookForm} from "../../features/Auth/Login/HookForm";

export const PATH = {
    TODOLIST: '/todolist/',
    LOGIN:'/login/'
}

export const Pages= React.memo(() =>{
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}
            <Routes>
                <Route path={'/todolist/*'} element={<Navigate to={PATH.TODOLIST}/>}/>
                <Route path={PATH.TODOLIST} element={<App/>}/>
                <Route path={'/login/*'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<HookForm/>}/>
                {/*/!*он отрисуется если пользователь захочет попасть на несуществующую страницу*!/*/}
                {/*<Route path={'/*'} element={<ErrorPage/>}/>*/}

            </Routes>
        </div>
    )
})

