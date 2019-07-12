import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";

import { Store } from "~/app/core/state/app-store";
import { Todo } from "~/app/core/models/todo.model";
import { TodoService } from "~/app/core/services/todo.service";
import { map } from "rxjs/operators";
import { NavigationService } from '~/app/core/services/navigation.service';

@Component({
    selector: "ns-seven-days-page",
    templateUrl: "./seven-days-page.component.html",
    styleUrls: ["./seven-days-page.component.scss"],
    moduleId: module.id
})
export class SevenDaysPageComponent implements OnInit {
    public todayDate: Date = new Date();
    public get tommorowDate() {
        return new Date(this.todayDate.getTime() + 24 * 60 * 60 * 1000);
    }
    public get thirdDayDate() {
        return new Date(this.todayDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    }
    public get fourthDayDate() {
        return new Date(this.todayDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    }
    public get fifthDayDate() {
        return new Date(this.todayDate.getTime() + 4 * 24 * 60 * 60 * 1000);
    }
    public get sixthDayDate() {
        return new Date(this.todayDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    }
    public get seventhDayDate() {
        return new Date(this.todayDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    }

    public showAddTodo: boolean;

    @ViewChild("addTodoButton", { static: false }) addTodoButton: ElementRef;

    public todos$ = this.store.select<Todo[]>("allTodos").pipe(
        map((rawTodos: Todo[]) => {
            if (rawTodos.length == 0){
                return [];
            }

            const todos = rawTodos.filter((todo: Todo) => {
                if (!todo.dueDate) {
                    return;
                }

                const currentDate = new Date();
                return todo.dueDate.getDate() <= currentDate.getDate() + 7;
            })

            return todos;
        })
    );
    public todayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 0)));
    public tommorowTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 1)));
    public thirdDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 2)));
    public fouthDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 3)));
    public fifthDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 4)));
    public sixthDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 5)));
    public seventhDayTodos$ = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => this.filterTODOByDay(todos, 6)));

    constructor(
        private readonly store: Store,
        private readonly todoService: TodoService,
        private readonly navigationService: NavigationService) {}

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

    private filterTODOByDay(rawTodos: Todo[], additionalDays: number) {
        if (rawTodos.length == 0) {
            return [];
        }

        const todos = rawTodos.filter((todo: Todo) => {
            if (!todo.dueDate) {
                return;
            }

            const currentDate = new Date();
            return todo.dueDate.getDate() === currentDate.getDate() + additionalDays;
        });

        return todos;
    }
}
