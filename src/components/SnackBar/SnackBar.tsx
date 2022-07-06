import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {loadingAC} from "../../app/AppReducer";

export interface State extends SnackbarOrigin {
    open: boolean;
}

export const PositionedSnackbar=() =>{
const dispatch = useAppDispatch()
    const message = useAppSelector(state=> state.application.error)
    const opens = useAppSelector(state=> state.application.loading)
    console.log(message)


    const handleClick = (newState: SnackbarOrigin) => () => {

    };

    const handleClose = () => {
dispatch(loadingAC(false))
    };

    const buttons = (
        <React.Fragment>
            <Button
                onClick={handleClick({
                    vertical: 'bottom',
                    horizontal: 'center',
                })}
            >
                Bottom-Center
            </Button>
        </React.Fragment>
    );

    return (
        <div>
            {buttons}
            <Snackbar
                autoHideDuration={2000}
                open={opens}
                onClose={handleClose}
                message={message}

            />
        </div>
    );
}
