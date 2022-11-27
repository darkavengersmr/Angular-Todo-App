import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ITodo } from "../models/todo";
import { todos as localMockData } from "../data/todo";
import { catchError, delay, throwError, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    constructor(private http: HttpClient) {
    }

    todos: ITodo[] = []
    loading = false

    private errorHandler = (error: HttpErrorResponse) => {        
        this.todos = localMockData
        this.loading = false
        return throwError(() => error.message)
    }

    getAll() {
        this.loading = true
        const newTodos = this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos2')
            .pipe(
                delay(2000),
                catchError(this.errorHandler),
                tap(() => {this.loading = false})
            )
        newTodos.subscribe(data => this.todos = data.filter((el) => el.userId === 1))
    }

    completeTask(id: number) {
        this.todos = this.todos.map(el => el.id === id ? {...el, completed: !el.completed} : el)
    }

    addTask(task: string) {
        this.todos.push({
            id: this.todos.length + 1,
            userId: 0,
            title: task,
            completed: false
        })
    }

    removeTask(id: number) {
        this.todos = this.todos.filter(task => task.id !== id)
    }

    updateTask(id: number, title: string) {
        this.todos = this.todos.map(task => task.id === id ? {...task, title: title} : task )
    }
}