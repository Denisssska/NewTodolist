const IS_LOADING = 'IS_LOADING';
const ERROR = 'ERROR';

const initialState = {
    loading:false,
    error:null
}
export type errorAppType = typeof initialState

export type ErrorActionType = ReturnType<typeof loadingAC>| ReturnType<typeof setErrAC>

export const loadingAC = (loading: boolean) => ({type: IS_LOADING, loading}) as const
export const setErrAC = (error: string|null) => ({type: ERROR, error}) as const

export const appReducer = (state: errorAppType = initialState, action: ErrorActionType): errorAppType => {

    switch (action.type) {
        case IS_LOADING: {
            return {...state,loading: action.loading}
        }
        case ERROR:{
            return <errorAppType>{...state, error: action.error}
        }
        default:
            return state}}


    
