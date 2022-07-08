import React from 'react';
import {ButtonAppBar} from "../components/BasicAppBar/ButtonAppBar";
import {Pages} from "../components/Header/Pages";
import {BrowserRouter} from "react-router-dom";

export const GlobalUa = () => {
    return (
        <>
            <BrowserRouter>
                <ButtonAppBar/>
                <Pages/>
            </BrowserRouter>
        </>
    );
};

