import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {addTodolistAC, removeTodolistAC, todolistId1} from "./todolistReducer";

const REMOVE_TASK = 'remove task';
const ADD_TASK = "add task";
const CHANGE_TASK_STATUS = 'change task status';
const CHANGE_TASK_TEXT = 'change task text';
const ADD_TODOLIST = 'add todolist';
const REMOVE_TODOLIST = "remove todolist";

export type InitialTaskStateType = typeof initialTaskState
export type TasksType = {
    [key: string]: Array<TaskType>
}

let initialTaskState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ] as TaskType[]
};
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTextAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>;


export const removeTaskAC = (id: string, todolistId: string) => ({type: 'remove task', id, todolistId}) as const
export const addTaskAC = (title: string, todolistId: string) => ({type: 'add task', title, todolistId}) as const
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({
    type: 'change task status', id, isDone, todolistId
}) as const
export const changeTaskTextAC = (id: string, title: string, todolistId: string) => ({
    type: 'change task text', id, title, todolistId
}) as const

export const taskReducer = (state: InitialTaskStateType = initialTaskState, action: ActionsType): InitialTaskStateType => {
    switch (action.type) {
        case  REMOVE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((item) => item.id !== action.id)
            }
        }
        case ADD_TASK: {
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        }
        case CHANGE_TASK_STATUS: {
            state[action.todolistId] = state[action.todolistId].map(item => item.id === action.id ?
                {...item, isDone: action.isDone} : item);
            return {...state}
        }
        case CHANGE_TASK_TEXT: {
            state[action.todolistId] = state[action.todolistId].map(item => item.id === action.id ?
                {...item, title: action.title} : item);
            return {...state}
        }

        case ADD_TODOLIST: {
            return {...state, [action.id]: []}
        }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy
        }
        default:
            return state
    }
}

