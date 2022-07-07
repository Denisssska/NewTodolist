const IS_LOADING = 'IS_LOADING';
const ERROR = 'ERROR';
const IS_PROCESS = 'IS_PROCESS';

const initialState = {
    loading: false,
    error: null,
    process: true
}
export type errorAppType = typeof initialState

export type ErrorActionType = ReturnType<typeof loadingErrorAC>
    | ReturnType<typeof setErrAC>
    | ReturnType<typeof changeProcessAC>

export const loadingErrorAC = (loading: boolean) => ({type: IS_LOADING, loading}) as const
export const setErrAC = (error: string | null) => ({type: ERROR, error}) as const
export const changeProcessAC = (process: boolean) => ({type: IS_PROCESS, process}) as const

export const appReducer = (state: errorAppType = initialState, action: ErrorActionType): errorAppType => {

    switch (action.type) {
        case IS_LOADING: {
            return {...state, loading: action.loading}
        }
        case ERROR: {

            return <errorAppType>{...state, error: action.error}
        }
        case "IS_PROCESS":{
            return {...state,process: action.process}
        }
        default:
            return state
    }
}


    
