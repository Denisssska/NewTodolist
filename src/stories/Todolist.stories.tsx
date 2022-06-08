import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Todolist} from "../Todolist";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist',
    components: Todolist,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Todolist>

const addTaskCallback = action('Task want to added')
const changeFilterCallback = action('Task want to change filter')
const changeTaskStatusCallback = action('Task want to change status')
const changeTodolistTitleCallback = action('Todolist want to change title')
const changeTodolistTextCallback = action('todolist want to change text')
const removeTaskCallback = action('Task want to remove')
const removeTodolistCallback = action('Todolist want to remove')

const filter= 'active'
export const TodolistExample: ComponentStory<typeof Todolist> = () => <div>
    <Todolist  addTask={addTaskCallback} 
               changeFilter={changeFilterCallback}
               changeTaskStatus={changeTaskStatusCallback} 
               changeTodolistTitle={changeTodolistTitleCallback} 
               filter={filter} onChangeText={changeTodolistTextCallback}
               removeTask={removeTaskCallback} removeTodolist={removeTodolistCallback}
               tasks={[{id: '1', title: "HTML&CSS", isDone: true}]} title={'todolist'} todolistId={'todolistId1'}/>
    </div>
;
