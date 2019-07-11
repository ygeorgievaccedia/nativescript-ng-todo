import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular/listview-directives';

import { Todo } from '~/app/core/models/todo.model';
import { LoggerService } from '~/app/core/services/logger.service';
import { TodoService } from '~/app/core/services/todo.service';

@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
    moduleId: module.id
})
export class TodoListComponent {
    @Input() todoItems: Todo[];
    @Output() addTodo: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild("todoListView", { read: RadListViewComponent, static: false }) todoListView: RadListViewComponent;

    constructor(private readonly todoService: TodoService, private readonly loggerService: LoggerService) {}

    public onLeftSwipeTap(args: ListViewEventData) {
        this.todoListView.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeTap(args: ListViewEventData) {
        this.todoListView.listView.notifySwipeToExecuteFinished();
    }

    public onItemTap(id: string){
        // navigate to todo details
    }

    public onToggleComplete(todo: Todo) {
        this.loggerService.log("TodoListComponent#onToggleComplete");
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
            todo.completedOn = new Date();
        } else {
            todo.completedOn = undefined;
        }
        this.todoService.updateTodo(todo);
    }

    public onToggleFavourite(todo: Todo) {
        this.loggerService.log("TodoListComponent#onToggleFavourite");
        todo.isFavourite = !todo.isFavourite;
        this.todoService.updateTodo(todo);
    }
}
