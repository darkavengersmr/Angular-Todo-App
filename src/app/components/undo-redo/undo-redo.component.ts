import { Component } from '@angular/core';
import { TodoListService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
})
export class UndoRedoComponent {
  constructor (public todoService: TodoListService) {}
}
