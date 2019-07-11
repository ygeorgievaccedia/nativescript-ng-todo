import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';
import * as utils from "tns-core-modules/utils/utils";

import { Todo } from '~/app/core/models/todo.model';

@Component({
    selector: "ns-add-todo",
    templateUrl: "./add-todo.component.html",
    styleUrls: ["./add-todo.component.scss"],
    moduleId: module.id
})
export class AddTodoComponent implements OnInit {
    public todo: Todo;

    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor(private readonly page: Page) {
        this.todo = <Todo>{};
    }

    public ngOnInit() {
        this.focusTitle();
    }

    public onAddTodo(){
        this.addTodo.emit(this.todo);
    }

    private focusTitle() {
        const focusTextField: any = this.page.getViewById("todo-title");

        if (focusTextField.ios) {
            focusTextField.focus();
        }

        if (focusTextField.android) {
            setTimeout(() => {
                focusTextField.android.requestFocus();
                const imm = utils.ad.getInputMethodManager();
                imm.showSoftInput(focusTextField.android, 0);
            }, 300);
        }
    }
}
