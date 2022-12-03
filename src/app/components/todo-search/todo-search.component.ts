import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',  
})
export class TodoSearchComponent {  
  @Output() searchString: EventEmitter<string> = new EventEmitter<string>

  onInput(event: any) {
    this.searchString.emit((event.target as HTMLInputElement).value)
  }
}
