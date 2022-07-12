import React from 'react';
import {useFormik} from "formik";
import {AuthPayload} from "../../../API/AuthApi";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {loginTC} from "../Auth-reducer";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import {Navigate} from "react-router-dom";

export const FormLogin =() => {
    const isAuth= useAppSelector(state=>state.auth.isAuth)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email)
                return {
                    email: 'invalid email'
                }
            if (!values.password)
                return {
                    email: 'invalid password'
                }
        },
        onSubmit: (values: AuthPayload) => {

            console.log(JSON.stringify(values))
            dispatch(loginTC({...values}))
        },
    });
    console.log(isAuth)
if (isAuth)return <Navigate  to={'/'}/>
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={4} >
                <form style={{alignItems:'center',
                margin:'5% 22%'}} onSubmit={formik.handleSubmit}>
                    <FormControl >
                        <FormLabel>
                            <FormGroup>
                                <label htmlFor="email">Email Address</label>
                                <TextField
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <label htmlFor="password">Password</label>
                                <TextField
                                    type="password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                <label htmlFor="rememberMe">Remember me</label>
                                <FormControlLabel
                                    label={'remember me'}
                                    control={<Checkbox {...formik.getFieldProps('rememberMe')}  />}/>
                                {formik.errors.rememberMe ? <div>{formik.errors.rememberMe}</div> : null}
                                <Button variant={'contained'} color={'primary'} type="submit">Login</Button>
                            </FormGroup>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
}

