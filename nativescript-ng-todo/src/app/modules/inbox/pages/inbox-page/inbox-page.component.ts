import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { screen } from "tns-core-modules/platform";
import { Button } from "tns-core-modules/ui/button";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";

import { Store } from "~/app/core/state/app-store";
import { Todo } from "~/app/core/models/todo.model";
import { TodoService } from '~/app/core/services/todo.service';

@Component({
    selector: "ns-inbox-page",
    templateUrl: "./inbox-page.component.html",
    styleUrls: ["./inbox-page.component.scss"],
    moduleId: module.id
})
export class InboxPageComponent implements OnInit, AfterViewInit {
    public showAddTodo: boolean = false;
    public currentUser$ = this.store.select<any>("currentUser");
    public todos$ = this.store.select<Todo[]>("allTodos");

    @ViewChild("addTodoButton", { static: false }) addTodoButton: ElementRef;

    constructor(
        private readonly store: Store,
        private readonly todoService: TodoService) {}

    public ngOnInit() {
        this.todoService.getTodosList();
    }

    public ngAfterViewInit() {
        const button = <Button>this.addTodoButton.nativeElement;
        AbsoluteLayout.setTop(button, screen.mainScreen.heightDIPs - Number(button.height) - 150);
        AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
    }

    public onAddTodoAction() {
        this.showAddTodo = true;
    }

    public onDrawerButton() {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }
}
