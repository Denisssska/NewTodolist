import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './app/App';
import {Provider} from "react-redux";
import store from "./state/redux-store";
import {ButtonAppBar} from "./components/BasicAppBar/ButtonAppBar";
import {BurgerMenu} from "./components/BurgerMenu/BurgerMenu";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ButtonAppBar/>
        {/*<App/>*/}
        <BurgerMenu/>
    </Provider>
);
reportWebVitals();

