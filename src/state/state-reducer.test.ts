import {v1} from "uuid";

import {
    removeTaskAC,
    addTaskAC, changeTaskStatusAC,
    changeTaskTextAC,
    taskReducer, TasksType
} from "./stateReducer";
import {TaskType} from "../Todolist";
import { removeTodolistAC} from "./todolistReducer";


let todolistId1 = v1();
let todolistId2 = v1();
const startState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ] as TaskType[],
    [todolistId2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ] as TaskType[]
};
let id = startState[todolistId1][0].id
test('remove task', () => {
    const endState = taskReducer(startState, removeTaskAC(id, todolistId1))
    console.log(endState)
    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][1].title).toBe("ReactJS")
    expect(endState).not.toBe(startState)
})

test('add task', () => {
    let newTitle = 'HomeWork';
    const endState = taskReducer(startState, addTaskAC(newTitle, todolistId1))
    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId1][5].title).toBe('HomeWork')
    expect(endState).not.toBe(startState)
    console.log(endState)
})
test('change task status', () => {
    let id = startState[todolistId1][2].id
    let isDone = true
    const endState = taskReducer(startState, changeTaskStatusAC(id, isDone, todolistId1))
    expect(endState[todolistId1][2].isDone).toBe(true)
    expect(endState).not.toBe(startState)
    console.log(endState)
})
test('change task text', () => {
    let id = startState[todolistId1][3].id
    let title = 'Super'
    const endState = taskReducer(startState, changeTaskTextAC(id, title, todolistId1))
    expect(endState[todolistId1][3].title).toBe('Super')
    expect(endState).not.toBe(startState)
    console.log(endState)
})


test('property with todolistId should be deleted', () => {

    const action =removeTodolistAC(todolistId1);
    const endState = taskReducer(startState,action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId1]).toBeUndefined()
    expect(endState).not.toBe(startState)

})