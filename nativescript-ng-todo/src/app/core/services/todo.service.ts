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

    public getFilteredTodos(searchFilter) {
        if (!searchFilter) {
            this.store.set("searchedTodos", []);
            return;
        }

        const todos = this.store.value.allTodos.filter(t => t.title.indexOf(searchFilter) != -1);
        this.store.set("searchedTodos", todos);
    }

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

    public getTodoDetails(todoId: string) {
        this.repository.getTodoDetails(todoId, this.errorService.handleFirestoreError, (docSnap: firestore.DocumentSnapshot) => {
            this.ngZone.run(() => {
                if (docSnap.exists) {
                    const todo: Todo = <Todo>docSnap.data();
                    todo.id = docSnap.id;
                    this.store.set("selectedTodo", todo);
                } else {
                    this.loggerService.error("The searched todo doesn't exists!");
                }
            })
        })
    }

    public addTodo(todo: Todo) {
        if (!todo.priority) {
            todo.priority = 3; //default value
        }
        if (!todo.project) {
            todo.project = "Inbox";
        }

        todo.createdOn = new Date();
        todo.modifiedOn = new Date();

        this.repository.addTodo(todo, this.errorService.handleFirestoreError, () => {
            this.loggerService.log("TodoService#addTodo, Added todo");
        });
    }

    public updateTodo(todo: Todo) {
        todo.modifiedOn = new Date();
        this.repository.updateTodo(todo, this.errorService.handleFirestoreError, () => {
            this.loggerService.log("TodoService#updateTodo, Updated todo");
        })
    }

    public deleteTodo(todoId: string) {
        this.repository.deleteTodo(todoId, this.errorService.handleFirestoreError, () => {
            this.loggerService.log("TodoService#deleteTodo, Deleted todo");
        })
    }
}
