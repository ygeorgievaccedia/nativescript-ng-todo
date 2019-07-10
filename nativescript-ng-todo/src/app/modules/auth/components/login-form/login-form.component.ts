import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';

import { LoginUser } from '~/app/core/models/login-user';
import { KeyboardHelperService } from '~/app/core/helpers/keyboard-helper.service';

@Component({
    selector: "ns-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    @Input() user: LoginUser;
    @Output() login: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();

    @ViewChild("loginForm", { static: false }) loginForm: RadDataFormComponent;

    constructor(private readonly keyboardHelperService: KeyboardHelperService) {
        this.user = new LoginUser("", "");
    }

    public async onLogin() {
        const isValid = await this.loginForm.dataForm.validateAndCommitAll();

        if (isValid) {
            this.keyboardHelperService.dismissSoftKeybaord();
        } else {
            const options = {
                title: "Login Error",
                message: "Please fix fields errors and try again",
                okButtonText: "OK"
            }

            alert(options);
        }
    }
}
