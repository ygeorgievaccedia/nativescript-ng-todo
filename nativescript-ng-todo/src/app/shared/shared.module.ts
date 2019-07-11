import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListEntryComponent } from './components/todo-list-entry/todo-list-entry.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { FriendlyDatePipe } from './pipes/friendly-date.pipe';
import { DuedateModalComponent } from './modals/duedate-modal/duedate-modal.component';
import { DatepickerModalComponent } from './modals/datepicker-modal/datepicker-modal.component';
import { PrioritiesModalComponent } from './modals/priorities-modal/priorities-modal.component';
import { LabelsModalComponent } from './modals/labels-modal/labels-modal.component';

@NgModule({
    declarations: [
        TodoListComponent,
        TodoListEntryComponent,
        AddTodoComponent,
        FriendlyDatePipe,
        DuedateModalComponent,
        DatepickerModalComponent,
        PrioritiesModalComponent,
        LabelsModalComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        TNSFontIconModule
    ],
    exports: [
        TodoListComponent,
        AddTodoComponent,
        FriendlyDatePipe,
        DuedateModalComponent,
        DatepickerModalComponent,
        PrioritiesModalComponent,
        LabelsModalComponent,
    ],
    entryComponents: [
        DuedateModalComponent,
        DatepickerModalComponent,
        PrioritiesModalComponent,
        LabelsModalComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
