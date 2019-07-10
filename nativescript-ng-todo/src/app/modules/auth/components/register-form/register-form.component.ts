import { Component, ViewChild, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { RegisterUser } from '~/app/core/models/register-user.model';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { KeyboardHelperService } from '~/app/core/helpers/keyboard-helper.service';

@Component({
    selector: "ns-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
    @Input() user: RegisterUser;
    @Output() register: EventEmitter<RegisterUser> = new EventEmitter<RegisterUser>();

    @ViewChild("registerForm", { static: false }) registerForm: RadDataFormComponent;

    constructor(private readonly keyboardHelperService: KeyboardHelperService) {
        this.user = new RegisterUser("", "", "");
    }

    public async onRegister() {
        const isValid = await this.registerForm.dataForm.validateAndCommitAll();

        if (isValid) {
            this.keyboardHelperService.dismissSoftKeybaord();
            this.register.emit(this.user);
        } else {
            const options = {
                title: "Register Error",
                message: "Please fix fields errors and try again",
                okButtonText: "OK"
            }

            alert(options);
        }
    }

    public onPropertyValidate(args) {
        let validationResult = true;

        if (args.propertyName === "confirmPassword") {
            const dataForm = args.object;
            const password = dataForm.getPropertyByName("password");
            const confirmPassword = args.entityProperty;
            if (password.valueCandidate !== confirmPassword.valueCandidate) {
                confirmPassword.errorMessage = "Passwords do not match.";
                validationResult = false;
            }
        }

        args.returnValue = validationResult;
    }
}
