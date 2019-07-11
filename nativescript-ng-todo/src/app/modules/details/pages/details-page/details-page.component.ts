import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

import { Todo } from '~/app/core/models/todo.model';
import { NavigationService } from '~/app/core/services/navigation.service';
import { TodoService } from '~/app/core/services/todo.service';
import { Store } from '~/app/core/state/app-store';

@Component({
    selector: "ns-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.scss"],
    moduleId: module.id
})
export class DetailsPageComponent implements OnInit {
    private todoId: string;
    public todo$: Observable<Todo> = this.store.select<Todo>("selectedTodo");

    constructor(
        private readonly store: Store,
        private readonly todoService: TodoService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute) {}

    public ngOnInit() {
        this.todoId = this.activatedRoute.snapshot.paramMap.get("id");
        this.todoService.getTodoDetails(this.todoId);
    }

    public onSave(todo: Todo) {

    }

    public async onDelete() {
        const confirmOptions = {
            title: "Confirmation required",
            message: "Are you sure you want to delete this item?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        } as ConfirmOptions;

        const shouldDelete = await confirm(confirmOptions);
        if (shouldDelete) {
            this.todoService.deleteTodo(this.todoId);
            this.goBack();
        }
    }

    public goBack() {
        this.navigationService.back();
    }
}
