import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

import { Todo } from "~/app/core/models/todo.model";

@Component({
    selector: "ns-todo-list-entry",
    templateUrl: "./todo-list-entry.component.html",
    styleUrls: ["./todo-list-entry.component.scss"],
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListEntryComponent {
    @Input() todo: Todo;
    @Input() showDetails: boolean = false;

    @Output() itemTap: EventEmitter<string> = new EventEmitter<string>();
    @Output() toggleFavourite: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter<Todo>();

    public onToggleComplete() {
        this.toggleComplete.emit(this.todo);
    }

    public onToggleFavourite() {
        this.toggleFavourite.emit(this.todo);
    }

    public onTapDetails() {
        this.itemTap.emit(this.todo.id);
    }
}
