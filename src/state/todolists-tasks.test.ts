import {addTodolistAC, todolistReducer, TodolistsType} from "./todolistReducer";
import {taskReducer, TasksType} from "./stateReducer";


test('add todolist when task is added', () => {
    const startTodolistState: Array<TodolistsType> = []
    const startState: TasksType = {}
    const action = addTodolistAC('new');
    const endState = taskReducer(startState, action);
    const endTodolistsState = todolistReducer(startTodolistState, action);
    const keys = Object.keys(endState);
    const idFromTask = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    expect(keys.length).toBe(1);
    expect(idFromTask).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
    expect(endState).not.toBe(startState);
    expect(endTodolistsState).not.toBe(startTodolistState);
})
