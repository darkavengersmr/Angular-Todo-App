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

    private errorGetHandler = (error: HttpErrorResponse) => {        
        this.todos = localMockData
        this.loading = false
        return throwError(() => error.message)
    }

    private errorPostHandler = (error: HttpErrorResponse) => {                
        this.loading = false        
        return throwError(() => error.message)
    }

    getAll() {
        this.loading = true
        const newTodos = this.http.get<ITodo[]>('https2://jsonplaceholder.typicode.com/todos?_limit=5')
            .pipe(
                delay(1000),
                catchError(this.errorGetHandler),
                tap(() => {this.loading = false})
            )
        newTodos.subscribe(data => this.todos = data.filter((el) => el.userId === 1))
    }

    get(id: number): ITodo {
        return this.todos.filter(todo => todo.id === id)[0]
    }

    completeTask(id: number) {
        this.todos = this.todos.map(el => el.id === id ? {...el, completed: !el.completed} : el)
    }

    addTask(task: string) {
        const newTask = {
            id: this.todos.length + 1,            
            userId: 0,
            title: task,
            completed: false
            }

        this.loading = true
        const newTodos = this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', newTask)
            .pipe(                            
                catchError(this.errorPostHandler),   
                tap(() => {this.loading = false})
            )
        newTodos.subscribe(data => {this.todos.push(data); console.log(data)})        
    }

    removeTask(id: number) {
        this.todos = this.todos.filter(task => task.id !== id)
    }

    updateTask(id: number, title: string) {
        if (title.length) this.todos = this.todos.map(task => task.id === id ? {...task, title: title} : task )
    }

    swapTask(id1: number, id2: number) {
        const idx1 = this.todos.indexOf(this.get(id1))
        const idx2 = this.todos.indexOf(this.get(id2))
        const tmp = this.get(id1)        
        this.todos[idx1] = this.get(id2)
        this.todos[idx2] = tmp
        this.todos = [...this.todos]
    }
}