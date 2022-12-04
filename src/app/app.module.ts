import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.componet';
import { TodoAddModalComponent } from './components/modal/todo-add-modal/todo-add-modal.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoSearchComponent } from './components/todo-search/todo-search.component';
import { SearchPipe } from './pipes/search.pipe';
import { UndoRedoComponent } from './components/undo-redo/undo-redo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoAddModalComponent,
    TodoSearchComponent,
    SearchPipe,
    UndoRedoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
