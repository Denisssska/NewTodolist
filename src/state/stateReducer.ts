import {addTodolistAC, removeTodolistAC} from "./todolistReducer";
import {PayLoadType, tasksAPI, TaskType} from "../API/TasksApi";
import {ThunkAction} from "redux-thunk";
import {StateAppType} from "./redux-store";
import {AnyAction} from "redux";


const REMOVE_TASK = 'remove task';
const ADD_TASK = "add task";
const GET_TASK = "GET_TASK";
const UPDATE_TASK = 'UPDATE_TASK';
export type InitialTaskStateType = typeof initialTaskState

let initialTaskState = {tasks: [] as Array<TaskType>}


type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof getTaskAC>;


export const removeTaskAC = (id: string, todolistId: string) => ({type: 'remove task', id, todolistId}) as const
export const getTaskAC = (data: Array<TaskType>) => ({type: 'GET_TASK', data}) as const
export const addTaskAC = (item: TaskType, todolistId: string) => ({type: 'add task', item, todolistId}) as const
export const updateTaskAC = (taskId:string, payLoad:PayLoadType, todolistId: string) => ({
    type: "UPDATE_TASK",
    taskId,
   payLoad,
    todolistId
}) as const

export const taskReducer = (state: InitialTaskStateType = initialTaskState, action: ActionsType): InitialTaskStateType => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, ...action.data]
            }
        }
        case  REMOVE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter((item) => item.id !== action.id)
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                tasks: [action.item, ...state.tasks]
            }
        }
        case UPDATE_TASK: {
            return{
                        ...state, tasks: state.tasks.map(item => item.id === action.taskId ?
                            {...item,...action.payLoad} : item)
                    }}

        default:
            return state
    }
}

export const getTaskTC = (todolistId: string): ThunkAction<void, StateAppType, unknown, AnyAction> => (dispatch) => {
    tasksAPI.getTasks(todolistId).then((data) => dispatch(getTaskAC(data.data.items)))
}
export const addTaskTC = (title: string, todolistId: string): ThunkAction<void, StateAppType, unknown, AnyAction> => (dispatch) => {
    tasksAPI.createTasks(title, todolistId).then((items) => {
        dispatch(addTaskAC(items.data.data.item, todolistId))
    })
}
export const removeTaskTC = (todolistId: string, taskId: string): ThunkAction<void, StateAppType, unknown, AnyAction> => (dispatch) => {
    tasksAPI.deleteTasks(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const updateTaskTC = (taskId:string, item:PayLoadType, todolistId: string): ThunkAction<void, StateAppType, unknown, AnyAction> => (dispatch,getState:()=>StateAppType) => {
  const state = getState()
    const newTask = state.tasks.tasks.find(item=>item.id === taskId)
if(!newTask)return
   let payLoad = { title:newTask.title,
       status: newTask.status,
       description:newTask.description,
       priority:newTask.priority,
       startDate:newTask.startDate,
       deadline:newTask.deadline,...item} as PayLoadType
    tasksAPI.updateTask(taskId, payLoad, todolistId).then((item) => {
        dispatch(updateTaskAC(taskId, payLoad, todolistId))
    })
}
