import { Injectable } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { Todo } from '../models/todo.model';

export interface FirestoreFilter {
    fieldPath: string,
    opStr: firestore.WhereFilterOp,
    value: any
}

@Injectable({
    providedIn: "root"
})
export class TodoRepositoryService {
    private readonly todoRef:firestore.CollectionReference = firebase.firestore().collection("todos");

    public getTodoList(
        errorHandler: (error: any) => any,
        successHandler: (querySnapshot: firestore.QuerySnapshot) => void,
        filter?: FirestoreFilter) {

        if (filter) {
            this.todoRef
                .where(filter.fieldPath, filter.opStr, filter.value)
                .onSnapshot(successHandler, errorHandler);
        } else {
            this.todoRef.onSnapshot(successHandler, errorHandler);
        }
    }

    public getTodoDetails() {

    }

    public addTodo() {

    }

    public updateTodo(
        todo: Todo,
        errorHandler: (error: any) => any,
        successHandler: () => void) {

        this.todoRef
            .doc(todo.id)
            .update(todo)
            .then(successHandler)
            .catch(errorHandler);
    }

    public deleteTodo() {

    }
}
