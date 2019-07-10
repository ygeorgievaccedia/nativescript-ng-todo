import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

import { AuthRepositoryService } from "./auth-repository.service";
import { Store } from '~/app/core/state/app-store';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private readonly repository: AuthRepositoryService,
        private readonly ngZone: NgZone,
        private readonly store: Store) {}

    public isLoggedIn(): boolean {
        return this.store.value.currentUser !== undefined;
    }

    public login(email: string, password: string): Observable<void> {
        const observable = Observable.create(subscriber => {
            this.repository
                .login(email, password)
                .then(user => {
                   this.ngZone.run(() => {
                        this.store.set("currentUser", user);
                        subscriber.next();
                   })
                })
                .catch(error => subscriber.error(error));
        });

        return observable;
    }

    public register(email: string, password: string): Observable<void> {
        const observable = Observable.create(subscriber => {
            this.repository
                .register(email, password)
                .then(user => {
                    this.store.set("currentUser", user);
                    subscriber.next();
                })
                .catch(error => subscriber.error(error));
        });

        return observable;
    }

    public logout(): Promise<void> {
        this.store.set("currentUser", undefined);
        return this.repository.logout();
    }
}
