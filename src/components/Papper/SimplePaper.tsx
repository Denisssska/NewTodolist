import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Todolist} from "../../features/todolistList/todolist/Todolist";
import {TodolistsType} from "../../API/TodolistApi";

type PropsType = {
    item: TodolistsType
}
export const SimplePaper = React.memo((props: PropsType) => {
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
                <Todolist title={props.item.title}
                          filter={props.item.filter}
                          todolistId={props.item.id}
                          isDisabled={props.item.isDisabled}
                          key={props.item.id}
                />
            </Paper>
        </Box>
    );
})
