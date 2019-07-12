import * as firebase from "nativescript-plugin-firebase";

import { Todo } from '../models/todo.model';

export type StateKey = "allTodos" | "selectedTodo" | "searchedTodos" | "currentUser" | "showSpinner";

export interface State {
    allTodos: Todo[];
    selectedTodo: Todo;
    searchedTodos: Todo[],
    currentUser: firebase.User;
    showSpinner: boolean;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    allTodos: [],
    selectedTodo: undefined,
    searchedTodos: [],
    currentUser: undefined,
    showSpinner: false
}
