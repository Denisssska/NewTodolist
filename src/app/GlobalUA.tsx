import React, {useEffect} from 'react';
import {ButtonAppBar} from "../components/BasicAppBar/ButtonAppBar";
import {Pages, PATH} from "../components/Header/Pages";
import {BrowserRouter, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getDataTC} from "../features/Auth/Auth-reducer";


export const GlobalUa = React.memo(() => {
    const dispatch = useAppDispatch()
useEffect(()=>{
    dispatch(getDataTC())
})
    return (
        <>
            <BrowserRouter>
                <ButtonAppBar/>
              <Pages/>
            </BrowserRouter>
        </>
    );
})

