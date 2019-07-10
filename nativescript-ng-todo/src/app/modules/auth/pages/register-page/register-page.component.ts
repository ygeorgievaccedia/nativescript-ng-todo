import { Component } from "@angular/core";

import { RegisterUser } from '~/app/core/models/register-user.model';

@Component({
    selector: "ns-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
    moduleId: module.id
})
export class RegisterPageComponent {
    public currentUser: RegisterUser;

    constructor() {
        this.currentUser = new RegisterUser("", "", "");
    }

    public onRegister(registerUser: RegisterUser) {

    }
}
