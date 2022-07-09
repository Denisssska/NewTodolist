import React from 'react'
import {NavLink} from "react-router-dom";
import c from './header.module.css';

export const Header= React.memo(() =>{
    return (
            <div >
                <div><NavLink className={c.navLink}  to='/todolist/'>Todolist</NavLink></div>
                {/*<div><NavLink  to='/empty'>empty</NavLink></div>*/}
                {/*<div><NavLink  to='/empty'>empty</NavLink></div>*/}
                {/*<div><NavLink  to='/empty'>empty</NavLink></div>*/}
                {/*<div><NavLink  to='/empty'>empty</NavLink></div>*/}
                {/*<div><NavLink  to='/empty'>empty</NavLink></div>*/}
            </div>
    )
})
