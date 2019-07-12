import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular/listview-directives';
import { View } from 'tns-core-modules/ui/core/view';
import { confirm, ConfirmOptions } from 'tns-core-modules/ui/dialogs';

import { Todo } from '~/app/core/models/todo.model';
import { LoggerService } from '~/app/core/services/logger.service';
import { TodoService } from '~/app/core/services/todo.service';
import { NavigationService } from '~/app/core/services/navigation.service';

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

    constructor(
        private readonly todoService: TodoService,
        private readonly loggerService: LoggerService,
        private readonly navigationService: NavigationService) {}

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits  = args.data.swipeLimits;
        const swipeView = args['object'];
        const leftItem = swipeView.getViewById<View>("today-view");
        const rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }

    public onLeftSwipeTap(args: ListViewEventData) {
        const todo: Todo = args.object.bindingContext;
        todo.dueDate = new Date();
        this.todoService.updateTodo(todo);
        this.todoListView.listView.notifySwipeToExecuteFinished();
    }

    public async onRightSwipeTap(args: ListViewEventData) {
        const confirmationOptions = {
            title: "Confirmation required",
            message: "Are you sure you want to delte this record?",
            okButtonText: "DELETE",
            cancelButtonText: "Cancel"
        } as ConfirmOptions;

        const shouldDelete = await confirm(confirmationOptions);
        if (shouldDelete) {
            const todo: Todo = args.object.bindingContext;
            this.todoService.deleteTodo(todo.id);
        }

        this.todoListView.listView.notifySwipeToExecuteFinished();
    }

    public onItemTap(id: string){
        this.navigationService.navigate(["todo-details", id], { transition: { name: "slideLeft" } });
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
