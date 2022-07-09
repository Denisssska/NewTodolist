import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {App} from "../../app/App";

export const PATH = {
    TODOLIST: '/todolist'
}

export const Pages= React.memo(() =>{
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}
            <Routes>
                <Route path={'/todolist/*'} element={<Navigate to={PATH.TODOLIST}/>}/>
                <Route path={PATH.TODOLIST} element={<App/>}/>
                {/*/!*он отрисуется если пользователь захочет попасть на несуществующую страницу*!/*/}
                {/*<Route path={'/*'} element={<ErrorPage/>}/>*/}

            </Routes>
        </div>
    )
})

