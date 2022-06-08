import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'Task',
    components: Task,
} as ComponentMeta<typeof Task>

const changeTaskStatusCallback = action('Task want to changed status')
const onChangeTextCallback = action('Task want to changed text')
const removeTaskCallback = action('Task want to delete')

export const TaskBaseExample: ComponentStory<typeof Task> = () => <div>
        <Task changeTaskStatus={changeTaskStatusCallback}
              onChangeText={onChangeTextCallback}
              removeTask={removeTaskCallback}
              task={{id: '1', title: "JS", isDone: true}}
              todolistId={'todolistId1'}
        />
        <Task changeTaskStatus={changeTaskStatusCallback}
              onChangeText={onChangeTextCallback}
              removeTask={removeTaskCallback}
              task={ {id: '2', title: "ReactJS", isDone: false}}
              todolistId={'todolistId2'}
        />
    </div>
;
