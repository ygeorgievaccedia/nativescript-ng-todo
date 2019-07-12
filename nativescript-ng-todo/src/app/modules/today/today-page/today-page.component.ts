import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";

import { Store } from "~/app/core/state/app-store";
import { Todo } from "~/app/core/models/todo.model";
import { TodoService } from '~/app/core/services/todo.service';
import { map } from 'rxjs/operators';
import { NavigationService } from '~/app/core/services/navigation.service';

@Component({
    selector: "ns-today-page",
    templateUrl: "./today-page.component.html",
    styleUrls: ["./today-page.component.scss"],
    moduleId: module.id
})
export class TodayPageComponent implements OnInit, AfterViewInit, OnDestroy {
    public todayDate: Date;
    public showAddTodo: boolean;
    public todos$;

    @ViewChild("addTodoButton", { static: false }) addTodoButton: ElementRef;

    constructor(
        private readonly store: Store,
        private readonly todoService: TodoService,
        private readonly navigationService: NavigationService) {

        this.todayDate = new Date();
        this.showAddTodo = false;
        this.todos$ = this.store.select<Todo[]>("allTodos").pipe(
            map((todos: Todo[]) => {
                if (todos.length == 0) {
                    return [];
                }

                const todayTodos = todos.filter((todo: Todo) => {
                    if (!todo.dueDate) {
                        return;
                    }

                    return todo.dueDate.getDate() == this.todayDate.getDate();
                })

                return todayTodos;
            })
        );
    }

    public ngOnInit() {
        this.todoService.getTodosList();
    }

    public ngAfterViewInit() {
        const button = <Button>this.addTodoButton.nativeElement;
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
        AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
    }

    public onAddTodo(todo: Todo) {
        this.todoService.addTodo(todo);
        this.showAddTodo = false;
    }

    public onAddTodoAction() {
        this.showAddTodo = true;
    }

    public onOpenSearch() {
        this.navigationService.navigate(["search"], { transition: { name: "slideTop" } });
    }

    public onDrawerButton() {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }

    public ngOnDestroy() {
        console.log("ngOnDestroy");
    }
}
