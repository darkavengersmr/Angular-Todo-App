import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoListService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add-modal',
  templateUrl: './todo-add-modal.component.html',  
})
export class TodoAddModalComponent {
  @Input() visible: boolean

  form = new FormGroup({
    newTask: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  errorsVisible = false

  constructor(public todoService: TodoListService) {}

  submit() {    
    this.todoService.addTask(this.form.value.newTask!)
    this.form.reset()
    this.visible = false
  }
}
