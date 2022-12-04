import { ITodo } from "../models/todo";

export const todos: ITodo[] = [
    {
        userId: 1,
        id: 1,
        title: "Learn Angular",
        completed: false
    },
    {
        userId: 1,
        id: 2,
        title: "Learn Tailwind CSS",
        completed: false
    },
    {
        userId: 1,
        id: 3,
        title: "Make Todo App",
        completed: true
    },
    {
        userId: 1,
        id: 4,
        title: "Add search field",
        completed: true,
        level: 2
    },
    {
        userId: 1,
        id: 5,
        title: "Add Drad-and-Drop feature",
        completed: true,
        level: 2
    },
    {
        userId: 1,
        id: 6,
        title: "Add 2-level lists",
        completed: true,
        level: 2
    },
    {
        userId: 1,
        id: 7,
        title: "Add undo/redo features",
        completed: true,
        level: 2
    },
]