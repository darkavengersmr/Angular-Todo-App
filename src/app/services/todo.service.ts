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
    
    private todosHistory: ITodo[][] = [[]]
    private todosHistoryActual: number = 0
    loading = false    

    private errorGetHandler = (error: HttpErrorResponse) => {                
        this.todosHistory = [localMockData]
        this.loading = false
        return throwError(() => error.message)
    }

    private errorPostHandler = (error: HttpErrorResponse) => {                
        this.loading = false        
        return throwError(() => error.message)
    }

    downloadAll() {
        this.loading = true        
        const newTodos = this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .pipe(
            delay(2000),
            catchError(this.errorGetHandler),
            tap(() => {this.loading = false})
        )
        newTodos.subscribe(data => this.todosHistory = [data.filter((el) => el.userId === 1)])
    }

    getAll() {
        return this.todosHistory[this.todosHistoryActual]
    }

    get(id: number): ITodo {
        return this.todosHistory[this.todosHistoryActual].filter(todo => todo.id === id)[0]
    }

    cropTodoHistory() {
        if (this.todosHistoryActual + 1 < this.todosHistory.length) {
            this.todosHistory.slice(0, this.todosHistoryActual)
            this.todosHistoryActual = this.todosHistory.length - 1
        }        
    }

    completeTask(id: number) {
        this.cropTodoHistory()
        this.todosHistory.push(this.todosHistory[this.todosHistoryActual].map(el => el.id === id ? {...el, completed: !el.completed} : el))
        this.todosHistoryActual++
    } 

    addTask(task: string) {
        this.cropTodoHistory()

        const newTask = {
            id: this.todosHistory[this.todosHistoryActual].length + 1,            
            userId: 0,
            title: task,
            completed: false
            }

        this.loading = true
        const newTodos = this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', newTask)
            .pipe(   
                delay(2000),                         
                catchError(this.errorPostHandler),   
                tap(() => {this.loading = false})
            )
        newTodos.subscribe(data => {
            this.todosHistory.push([...this.todosHistory[this.todosHistoryActual], data])
            this.todosHistoryActual++
        })        
    }

    removeTask(id: number) {
        this.cropTodoHistory()
        this.todosHistory.push(this.todosHistory[this.todosHistoryActual].filter(task => task.id !== id))
        this.todosHistoryActual++
    }

    updateTask(id: number, title: string) {        
        if (title.length) {
            this.cropTodoHistory()
            this.todosHistory.push(this.todosHistory[this.todosHistoryActual].map(task => task.id === id ? {...task, title: title} : task ))
            this.todosHistoryActual++
        }
    }

    swapTask(id1: number, id2: number) {        
        this.cropTodoHistory()
        const idx1 = this.todosHistory[this.todosHistoryActual].indexOf(this.get(id1))
        const idx2 = this.todosHistory[this.todosHistoryActual].indexOf(this.get(id2))
        const tmp = this.get(id1)
        const newTodos = [...this.todosHistory[this.todosHistoryActual]]  
        newTodos[idx1] = this.get(id2)
        newTodos[idx2] = tmp
        this.todosHistory.push(newTodos)
        this.todosHistoryActual++
    }

    setLevel(id: number, level: number) {
        this.cropTodoHistory()
        this.todosHistory.push(this.todosHistory[this.todosHistoryActual].map(todo => todo.id === id ? {...todo, level} : todo))
        this.todosHistoryActual++
    }

    undo() {
        if (this.undoAvailable()) this.todosHistoryActual--
    }

    redo() {
        if (this.redoAvailable()) this.todosHistoryActual++
    }

    undoAvailable() {
        return this.todosHistoryActual > 0
    }

    redoAvailable() {
        return this.todosHistoryActual + 1 < this.todosHistory.length
    }
}