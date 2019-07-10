import { Component } from "@angular/core";
import { LoginUser } from "~/app/core/models/login-user.model";

@Component({
    selector: "ns-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
    moduleId: module.id
})
export class LoginPageComponent {
    public currentUser: LoginUser;

    constructor() {
        this.currentUser = new LoginUser("", "");
    }

    public onLogin(loginUser: LoginUser) {
        // show loading
    }
}
