import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from "rxjs/operators";

import { State, INITIAL_STATE, StateKey } from './app-state';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class Store {
    private state = new BehaviorSubject<State>(INITIAL_STATE);

    public select<T>(name: StateKey): Observable<T> {
        return this.state.pipe(
            pluck<State, T>(name),
            distinctUntilChanged<T>()
        )
    }

    public get value() {
        return this.state.value;
    }

    public set<T>(name: StateKey, state: T): void {
        this.state.next({
            ...this.value,
            [name]: state
        });
    }
}
