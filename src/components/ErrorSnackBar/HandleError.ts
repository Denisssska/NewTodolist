// generic function
import {loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {AppDispatch} from "../../state/redux-store";
import {ResponseType} from "../../API/TodolistApi";


export const handleServerAppError = (data: ResponseType , dispatch:AppDispatch) => {
    console.dir(data.messages)
    if (data.messages.length) {
        dispatch(loadingErrorAC(true))
        dispatch(setErrAC(data.messages[0]))
    } else if(data.resultCode !== 0 && data.messages) {
        dispatch(setErrAC('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: {message: string},dispatch: AppDispatch) => {
    alert(error.message)
    dispatch(setErrAC('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>