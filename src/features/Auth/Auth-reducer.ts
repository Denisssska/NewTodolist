import {authApi, AuthDataType, AuthPayload} from "../../API/AuthApi";
import {AppThunk} from "../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../components/ErrorSnackBar/HandleError";


export type ActionsAuthType = ReturnType<typeof getMeAuthAC>

type InitialDataStateType = typeof initialState
const GET_DATA = 'GET_DATA';

const initialState = {
    data: {} as AuthDataType,
    isAuth: false
}
const getMeAuthAC = (data: AuthDataType, isAuth: boolean) => ({type: 'GET_DATA', data, isAuth}) as const

export const authReducer = (state: InitialDataStateType = initialState, action: ActionsAuthType): InitialDataStateType => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state, data: action.data, isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}
export const getDataTC = (): AppThunk => (dispatch) => {
    dispatch(changeProcessAC(true))
    authApi.getMeAuth()
        .then(data => {
            console.log(data.data.data)
                if (data.data.resultCode === 0) {
                    dispatch(getMeAuthAC(data.data.data, true))
                    dispatch(changeProcessAC(false))
                    dispatch(loadingErrorAC(true))
                    dispatch(setErrAC('Successfully'))
                } else {
                    handleServerAppError(data.data, dispatch)
                    dispatch(changeProcessAC(false))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e.message, dispatch)
            }
        )
}
export const loginTC = (payLoad: AuthPayload): AppThunk => (dispatch) => {
    dispatch(changeProcessAC(true))
    authApi.loginUser(payLoad)
        .then(data => {
            console.log(data.data)
                if (data.data.resultCode === 0) {
                    console.log(data.data)
                    dispatch(getDataTC())
                    dispatch(changeProcessAC(false))
                } else {
                    handleServerAppError(data.data, dispatch)
                    dispatch(changeProcessAC(false))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e.message, dispatch)
            }
        )
}
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(changeProcessAC(true))
    authApi.logOut()
        .then(data => {
                if (data.data.resultCode === 0) {
                    console.log(data.data)
                    dispatch(getMeAuthAC({...data, login: null, email: null, id: null}, false))
                    dispatch(changeProcessAC(false))
                    dispatch(loadingErrorAC(true))
                    dispatch(setErrAC('Successfully'))
                } else {
                    handleServerAppError(data.data, dispatch)
                    dispatch(changeProcessAC(false))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e.message, dispatch)
            }
        )
}