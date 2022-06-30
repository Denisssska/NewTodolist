import {todolistReducer} from "../features/todolistList/todolist/todolistReducer";
import {taskReducer} from "../features/todolistList/todolist/task/TaskReducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";

export type StateAppType = ReturnType<typeof reducersBox>
let reducersBox = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})
let store = legacy_createStore(reducersBox,applyMiddleware(thunk))
// export type StoreType = typeof store;

export default store