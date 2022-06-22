import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '4ecfeb70-7dff-4183-b8c3-af65f71d42cf'
    }
});

export const todolistAPI = {
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title: title})
            .then((res) => res.data.data.item)
    },
    getTodolists() {
        return instance.get(`todo-lists`)
            .then((res) => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
            .then((res) => res.data)
    },
    updateTodolist(todolistId:string,title:string){
        return instance.put(`todo-lists/${todolistId}`,{title:title})
    }
}