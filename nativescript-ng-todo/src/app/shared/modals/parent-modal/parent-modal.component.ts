import { Component } from "@angular/core";
import { Store } from '~/app/core/state/app-store';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Todo } from '~/app/core/models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: "ns-parent-modal",
    templateUrl: "./parent-modal.component.html",
    styleUrls: ["./parent-modal.component.scss"],
    moduleId: module.id
})
export class ParentModalComponent {
    public selectedParent: Todo;
    public currentTodo: Todo;
    public todos$: Observable<Todo[]> = this.store.select<Todo[]>("allTodos").pipe(map((todos: Todo[]) => {
        return todos.filter((todo: Todo) => todo.id !== this.currentTodo.id);
    }));

    constructor(private store: Store, private params: ModalDialogParams) {
        this.selectedParent = this.params.context.selectedParent;
        this.currentTodo = this.params.context.currentTodo;
    }

    public onSelectParent(todo: Todo) {
        this.params.closeCallback(todo);
    }

    public onNoParent() {
        this.params.closeCallback(null);
    }

    public onClose() {
        this.params.closeCallback(undefined);
    }
}
