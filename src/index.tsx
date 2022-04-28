import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppNew from './AppNew';
import {Provider} from "react-redux";
import store from "./state/redux-store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>

        <AppNew/>

    </Provider>
);
reportWebVitals();

