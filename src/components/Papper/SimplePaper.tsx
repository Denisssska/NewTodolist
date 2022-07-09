import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Todolist} from "../../features/todolistList/todolist/Todolist";
import {FilterValuesType} from "../../API/TodolistApi";

type PropsType = {
    title: string
    filter: FilterValuesType
    todolistId: string
    isDisabled:boolean
    id:string
}
export const SimplePaper=(props:PropsType)=> {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,

                },
            }}
        >
            <Paper elevation={3}>
                <Todolist title={props.title}
                          filter={props.filter}
                          todolistId={props.id}
                          isDisabled={props.isDisabled}
                          key={props.id}
                />
            </Paper>
        </Box>
    );
}
