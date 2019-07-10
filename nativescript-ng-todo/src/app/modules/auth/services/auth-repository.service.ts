import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
    providedIn: "root"
})
export class AuthRepositoryService {
    public login(email: string, password: string): Promise<firebase.User> {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        });
    }

    public register(email: string, password: string): Promise<firebase.User> {
        return firebase.createUser({ email: email, password: password });
    }

    public logout(): Promise<void> {
        return firebase.logout();
    }
}
