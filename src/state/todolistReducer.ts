import {v1} from "uuid";

const REMOVE_TODOLIST = "remove todolist";
const ADD_TODOLIST = "add todolist";
const CHANGE_TODOLIST_TITLE = 'change todolist title';
const CHANGE_FILTER_TODOLIST = 'changed filter of todolist';

export const todolistId1 = v1();

export type InitialTodolistStateType = typeof initialState
const initialState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'}
]
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => ({type: "remove todolist", todolistId}) as const
export const addTodolistAC = (title: string) => ({type: "add todolist", title, id: v1()}) as const
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'change todolist title',
    todolistId,
    newTitle
}) as const
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => ({
    type: 'changed filter of todolist',
    value,
    todolistId
}) as const

export const todolistReducer = (state: InitialTodolistStateType = initialState, action: ActionsType): InitialTodolistStateType => {

    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter((el) => el.id !== action.todolistId)
        }
        case ADD_TODOLIST: {
            let newTodolist: TodolistsType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]

        }
        case  CHANGE_TODOLIST_TITLE: {
            const todolist = state.find((el) => el.id === action.todolistId)
            if (todolist)
                todolist.title = action.newTitle
            return [
                ...state
            ]
        }
        case CHANGE_FILTER_TODOLIST: {
            return state.map((item) => item.id === action.todolistId ? {...item, filter: action.value} : item)
        }

        default:
            return state
    }
}

