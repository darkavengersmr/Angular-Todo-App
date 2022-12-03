import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../models/todo';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(todos: ITodo[], search: string): ITodo[] {
    return todos.filter(todo => !todo.title.toLowerCase().indexOf(search.toLowerCase()));
  }

}
