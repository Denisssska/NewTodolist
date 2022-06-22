import axios from "axios";

 type CreateTaskType={
    resultCode:number
    messages:Array<string>
     fieldsErrors:Array<string>
    data:{
        item:TaskType
    }
}
 type DeleteTaskType={
    resultCode:number
    message:Array<string>
     fieldsErrors:Array<string>
    data:{}
}
type UpdateTaskType=CreateTaskType
type GetTaskType={
     error:string|null
    totalCount:number
         items:Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    description:string
    status:number
    priority: number
    startDate: string
    deadline: string
    todoListId:string
    order: number
    addedDate: string
}
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '4ecfeb70-7dff-4183-b8c3-af65f71d42cf'
    }
});

export const tasksAPI = {
    createTasks(title: string,todolistId:string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTasks(todolistId: string,taskId:string) {
        return instance.delete<DeleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(taskId:string,title:string,status:number,todolistId:string){
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`,{title:title,status:status})

    },

}