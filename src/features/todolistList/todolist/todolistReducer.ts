import {todolistAPI, TodolistsType} from "../../../API/TodolistApi";
import {AppThunk} from "../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../app/AppReducer";


const REMOVE_TODOLIST = "remove todolist";
const ADD_TODOLIST = "add todolist";
const CHANGE_TODOLIST_TITLE = 'change todolist title';
const CHANGE_FILTER_TODOLIST = 'changed filter of todolist';
const GET_ARRAY = 'GET_ARRAY';

const initialState = {
    todolists: [] as Array<TodolistsType>
}

export type InitialTodolistStateType = typeof initialState
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof getTodolistAC>

export const getTodolistAC = (data: Array<TodolistsType>) => ({type: GET_ARRAY, data}) as const
export const removeTodolistAC = (todolistId: string) => ({type: "remove todolist", todolistId}) as const
export const addTodolistAC = (title: string, serverId: string, addedDate: string, order: number) => ({
    type: "add todolist",
    title,
    id: serverId,
    addedDate,
    order
}) as const
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

export const todolistReducer = (state: InitialTodolistStateType = initialState, action: TodolistsActionType): InitialTodolistStateType => {

    switch (action.type) {
        case GET_ARRAY: {
            return {...state, todolists: [...action.data]}
        }
        case REMOVE_TODOLIST: {
            return {...state, todolists: state.todolists.filter((el) => el.id !== action.todolistId)}
        }
        case ADD_TODOLIST: {
            let newTodolist: TodolistsType = {
                id: action.id,
                title: action.title,
                filter: 'all',
                addedDate: action.addedDate,
                order: action.order
            }
            return {...state, todolists: [newTodolist, ...state.todolists]}

        }
        case  CHANGE_TODOLIST_TITLE: {
            return {
                ...state,
                todolists: state.todolists.map((item) => item.id === action.todolistId ? {
                    ...item,
                    title: action.newTitle
                } : item)
            }
        }

        case CHANGE_FILTER_TODOLIST: {
            return {
                ...state,
                todolists: state.todolists.map((item) => item.id === action.todolistId ? {
                    ...item,
                    filter:action.value
                } : item)
            }
        }
        default:
            return state}}


export const getTodolistsTC= ():AppThunk=>(dispatch)=>{
    todolistAPI.getTodolists()
        .then((res) => {
        console.log(res.data)
        dispatch(getTodolistAC(res.data))
            dispatch(changeProcessAC(false))
    })
        .catch((err) => {
alert(err.message)
        })
}
export const addTodolistsTC= (title:string):AppThunk=>(dispatch)=>{
    dispatch(changeProcessAC(true))
    todolistAPI.createTodolist(title)
        .then((item) => {
        //console.log(item)
      item && dispatch(addTodolistAC(item.title, item.id, item.addedDate, item.order))
            dispatch(changeProcessAC(false))
    })
}
export const removeTodolistTC=(todolistId:string):AppThunk=>(dispatch)=>{
    dispatch(changeProcessAC(true))
    todolistAPI.deleteTodolist(todolistId)
        .then((data)=>{
           // console.log(data)
            if(data.data.resultCode === 0){
                dispatch(removeTodolistAC(todolistId))
                dispatch(changeProcessAC(false))
            }
    })
}
// export const changeTodolistTitleTC =(todolistId:string,newText:string):ThunkType=>(dispatch)=>{
//     todolistAPI.updateTodolist(todolistId,newText).then((res)=>{
//         //console.log(res)
//         if(res.data.resultCode ===0){
//             dispatch(changeTodolistTitleAC(todolistId, newText))
//         }
//     })
// }
////синтаксис
export const changeTodolistTitleTC =(todolistId:string,newText:string):AppThunk=>async dispatch=>{
    try{
        dispatch(changeProcessAC(true))
        const res = await todolistAPI.updateTodolist(todolistId, newText)
        console.log(res.data.resultCode)
        if(res.data.resultCode ===0){
            dispatch(changeTodolistTitleAC(todolistId, newText))
            dispatch(changeProcessAC(false))
        }else{
            dispatch(changeProcessAC(false))
            dispatch(loadingErrorAC(true))
            dispatch(setErrAC(res.data.messages[0]))

        }
    } catch(e:any){

        throw new Error(e)
    }
    }

