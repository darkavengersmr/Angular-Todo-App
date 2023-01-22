import { Component } from '@angular/core';
import { TodoListService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add-in-list',
  templateUrl: './todo-add-in-list.component.html',  
})
export class TodoAddInListComponent {
  constructor (private todoService: TodoListService) {}
  newTitle = ''

  addTodo() {
    if (this.newTitle.length > 0) {
      this.todoService.addTask(this.newTitle)
      this.newTitle = ''
    }
    
  }
}
