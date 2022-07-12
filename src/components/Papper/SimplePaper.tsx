import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Todolist} from "../../features/todolistList/todolist/Todolist";

import {useAppSelector} from "../../hooks/hooks";

export const SimplePaper = React.memo(() => {
    const TodolistState = useAppSelector(state => state.todolist.todolists)

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
            {
                TodolistState.map((item) => {
                        return  <Paper key={item.id} elevation={3}>
                            <Todolist title={item.title}
                                      filter={item.filter}
                                      todolistId={item.id}
                                      isDisabled={item.isDisabled}
                                      key={item.id}
                            />
                        </Paper>
                    }
                )
            }
        </Box>
    );
})
