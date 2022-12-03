import {Component, EventEmitter, Input, IterableDiffers, Output} from '@angular/core'
import { ITodo } from 'src/app/models/todo'
import { TodoListService } from 'src/app/services/todo.service'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})

export class TodoListComponent {
    @Input() todo: ITodo
    @Input() dragIdInput: number
    @Output() dragIdOutput: EventEmitter<number> = new EventEmitter<number>
    @Input() editIdInput: number
    @Output() editIdOutput: EventEmitter<number> = new EventEmitter<number>

    newTitle: string = "";

    lastEdit: ITodo = {id: -1, title: "", completed: false} as ITodo    

    updateLastEdit(todo: ITodo, newTitle: string) {
        if (newTitle.length && todo.title !== newTitle) {
            this.lastEdit = {...todo, title: newTitle}                       
            if (this.todoService.get(this.lastEdit.id) && this.todoService.get(this.lastEdit.id).title !== this.lastEdit.title)
                this.todoService.updateTask(this.lastEdit.id, this.lastEdit.title)
        }        
    }

    startEdit(todo: ITodo) {
        if (this.todoService.get(this.lastEdit.id) && this.todoService.get(this.lastEdit.id).title !== this.lastEdit.title)
            this.todoService.updateTask(this.lastEdit.id, this.lastEdit.title)
        this.editIdOutput.emit(todo.id)
        this.newTitle = todo.title        
    }

    constructor(public todoService: TodoListService) {}

    dragStart(id: number) {
        this.dragIdOutput.emit(id)                
    }

    dragOver(id: number) {
        this.todoService.swapTask(id, this.dragIdInput)        
    }
}