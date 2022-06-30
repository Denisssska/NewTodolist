import axios from "axios";

import {FilterValuesType} from "../state/todolistReducer";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
    addedDate: string
    order: number
}
type ResponsType ={
    resultCode: number
    messages:string[],
    data: {
        item?:TodolistsType
    }
}
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '4ecfeb70-7dff-4183-b8c3-af65f71d42cf'
    }
});

export const todolistAPI = {
    createTodolist(title: string) {
        return instance.post<ResponsType>(`todo-lists`, {title: title})
             .then((res) => res.data.data.item)
    },
    getTodolists() {
        return instance.get<Array<TodolistsType>>(`todo-lists`)

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponsType>(`todo-lists/${todolistId}`)
            // .then((res) => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponsType>(`todo-lists/${todolistId}`, {title: title})
    }
}