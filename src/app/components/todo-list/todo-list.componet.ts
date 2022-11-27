import {Component, Input} from '@angular/core'
import { ITodo } from 'src/app/models/todo'
import { TodoListService } from 'src/app/services/todo.service'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})

export class TodoListComponent {
    @Input() todo: ITodo

    selected = -1

    newTitle: string = "";

    constructor(public todoService: TodoListService) {}
}