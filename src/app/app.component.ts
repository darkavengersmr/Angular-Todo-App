import { Component, OnInit } from '@angular/core';
import { TodoListService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  constructor (public todoService: TodoListService) {    
  }

  ngOnInit(): void {
    this.todoService.downloadAll()
  }

  title = 'angular-todo'
  search = ''
  dragId = -1
  editId = -1
}
