import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListEntryComponent } from './components/todo-list-entry/todo-list-entry.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@NgModule({
    declarations: [
        TodoListComponent,
        TodoListEntryComponent,
        AddTodoComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        TNSFontIconModule
    ],
    exports: [
        TodoListComponent,
        AddTodoComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
