import { Component } from '@angular/core';
import { TodoListService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list-title',
  templateUrl: './todo-list-title.component.html',  
})
export class TodoListTitleComponent {  
  constructor(public todoService: TodoListService) {}

  updateTitle(title: string) {
    this.todoService.updateTask(0, title)    
  }
}
