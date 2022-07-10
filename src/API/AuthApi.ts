import {instance} from "./TodolistApi";
export type AuthDataType={
    id: number |null
    email: string |null
    login: string |null
}
export type GetMeAuth ={
    resultCode: number
    messages: string[]
    data:AuthDataType
}
type DeleteMe ={
    resultCode: number
    messages: string[],
    data: {}
}
type AuthType ={
    resultCode:number
    messages: string[],
    data: {
        userId: number
    }
}
export type AuthPayload={
    email:string
    password:string
    rememberMe:boolean
    captcha?:boolean
}
export const authApi={
    loginUser(payload:AuthPayload){
       return instance.post<AuthType>(`auth/login`,{...payload})
    },
    getMeAuth() {
        return instance.get<GetMeAuth>(`auth/me`)

    },
    logOut(){
        return instance.delete<DeleteMe>(`auth/login`)
    }
}