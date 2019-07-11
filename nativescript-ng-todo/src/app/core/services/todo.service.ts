import { Injectable, NgZone } from "@angular/core";
import { TodoRepositoryService } from "../repositories/todo-repository.service";
import { Store } from "../state/app-store";
import { LoggerService } from "./logger.service";
import { ServerErrorHandlerService } from "./server-error-handler.service";
import { firestore } from "nativescript-plugin-firebase/firebase";
import { Todo } from "../models/todo.model";

@Injectable({
    providedIn: "root"
})
export class TodoService {
    constructor(
        private readonly repository: TodoRepositoryService,
        private readonly store: Store,
        private readonly loggerService: LoggerService,
        private readonly errorService: ServerErrorHandlerService,
        private readonly ngZone: NgZone
    ) {}

    public getTodosList() {
        this.repository.getTodoList(this.errorService.handleFirestoreError, (snapshot: firestore.QuerySnapshot) => {
            this.ngZone.run(() => {
                const todos = [];
                snapshot.forEach(docSnap => {
                    const todo: Todo = <Todo>docSnap.data();
                    todo.id = docSnap.id;
                    todos.push(todo);
                });
                this.store.set("allTodos", todos);
            });
        });
    }

    public getTodoDetails() {}

    public addTodo() {}

    public updateTodo(todo: Todo) {
        todo.modifiedOn = new Date();
        this.repository.updateTodo(todo, this.errorService.handleFirestoreError, () => {
            this.loggerService.log("TodoService#updateTodo, Updated todo");
        })
    }

    public deleteTodo() {}
}
