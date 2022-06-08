import React from 'react';
import {Provider} from "react-redux";
import store, {StateAppType} from "../state/redux-store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistId1, todolistReducer, TodolistsType} from "../state/todolistReducer";
import {taskReducer} from "../state/stateReducer";
import {v1} from "uuid";
import {TaskType} from "../Todolist";

const rootReducer = combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer
})

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all'}
    ] as TodolistsType[],
    tasks:{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ] as TaskType[]
    }
}
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as unknown as StateAppType)
export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={store}>{storyFn()}</Provider>
};

