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

    lastXPos: number = 0

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

    dragStart(id: number, event: DragEvent) {
        this.dragIdOutput.emit(id)
        this.lastXPos = event.x
    }

    dragEnd(id: number, event: any) {
        event.x - this.lastXPos > 0 ? this.todoService.setLevel(id, 2) : this.todoService.setLevel(id, 1)         
    }

    dragOver(id: number) {
        if (id !== this.dragIdInput) this.todoService.swapTask(id, this.dragIdInput)        
    }

    insertTask(position: number | null, title: string, todo: ITodo) {
        if (position) {
            this.newTitle = title.slice(0, position)
            this.todoService.updateTask(todo.id, this.newTitle)
            this.todoService.addTask(title.slice(position), todo.id, todo.level ? todo.level : 1)
        }
        
    }

}