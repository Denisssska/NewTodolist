import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BurgerMenu} from "../BurgerMenu/BurgerMenu";
import {LoginMenu} from "../LoginMenu";
import {useAppSelector} from "../../hooks/hooks";


export const ButtonAppBar=React.memo(()=> {
const data = useAppSelector(data=>data.auth)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BurgerMenu/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {data.data.login}
                    </Typography>
                    <LoginMenu/>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
})
