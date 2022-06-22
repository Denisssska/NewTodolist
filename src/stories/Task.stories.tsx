import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {useSelector} from "react-redux";
import {StateAppType} from "../state/redux-store";
import {TaskType} from "../Todolist";
import {todolistId1} from "../state/todolistReducer";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Task',
    components: Task,
    args: {
        todolistId: todolistId1,
        changeTaskStatus: action('Task want to changed status'),
        onChangeText: action('Task want to changed text'),
        removeTask: action('Task want to delete')
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const TaskWithDispatch = (args:{todolistId:string}) => {
    const task = useSelector<StateAppType, TaskType>(state => state.tasks[todolistId1][0])
    return <Task todolistId={args.todolistId} task={task}/>
}

export const Template: ComponentStory<typeof Task> = (args) => <TaskWithDispatch {...args}/>

//  export const Primary = Template.bind({})
// export const Primary= {args : {
//     changeTaskStatus: action('Task want to changed status'),
//     onChangeText: action('Task want to changed text'),
//     removeTask: action('Task want to delete'),
// }}