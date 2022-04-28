import {todolistReducer} from "./todolistReducer";
import {taskReducer} from "./stateReducer";
import {combineReducers, legacy_createStore} from "redux";


export type StateAppType = ReturnType<typeof reducersBox>
let reducersBox = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})
let store = legacy_createStore(reducersBox)
export type StoreType = typeof store;

export default store