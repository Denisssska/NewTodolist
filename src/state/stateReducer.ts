import {addTodolistAC, removeTodolistAC} from "./todolistReducer";
import {TaskType} from "../API/TasksApi";
import {AxiosResponse} from "axios";

const REMOVE_TASK = 'remove task';
const ADD_TASK = "add task";
const CHANGE_TASK_STATUS = 'change task status';
const CHANGE_TASK_TEXT = 'change task text';

const GET_TASK = "GET_TASK";

export type InitialTaskStateType = typeof initialTaskState
// export type TasksType = {
//     [key: string]: Array<TaskType>
// }

let initialTaskState = {tasks: [] as Array<TaskType>}

// {id: v1(), title: "HTML&CSS", isDone: true}
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTextAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof getTaskAC>;


export const removeTaskAC = (id: string, todolistId: string) => ({type: 'remove task', id, todolistId}) as const
export const getTaskAC = (data: Array<TaskType>) => ({type: 'GET_TASK', data}) as const
export const addTaskAC = (item: TaskType, todolistId: string) => ({type: 'add task', item, todolistId}) as const
export const changeTaskStatusAC = (id: string, status: number, todolistId: string) => ({
    type: 'change task status', id, status, todolistId
}) as const
export const changeTaskTextAC = (id: string, title: string, todolistId: string) => ({
    type: 'change task text', id, title, todolistId
}) as const

export const taskReducer = (state: InitialTaskStateType = initialTaskState, action: ActionsType): InitialTaskStateType => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                tasks: [...state.tasks,...action.data]
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
        case CHANGE_TASK_STATUS: {
            return {...state,tasks: state.tasks = state.tasks.map(item => item.id === action.id ?
                    {...item, status: action.status } : item)}
        }
        case CHANGE_TASK_TEXT: {
            state.tasks = state.tasks.map(item => item.id === action.id ?
                {...item, title: action.title} : item);
            return {...state}
        }

        default:
            return state
    }
}

