import { Component, OnDestroy, NgZone } from "@angular/core";

import { RegisterUser } from '~/app/core/models/register-user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '~/app/core/services/navigation.service';
import { LoggerService } from '~/app/core/services/logger.service';

@Component({
    selector: "ns-register-page",
    templateUrl: "./register-page.component.html",
    styleUrls: ["./register-page.component.css"],
    moduleId: module.id
})
export class RegisterPageComponent implements OnDestroy {
    public currentUser: RegisterUser;

    private registrationSubscription: Subscription;

    constructor(
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly loggerService: LoggerService,
        private readonly ngZone: NgZone) {

        this.currentUser = new RegisterUser("", "", "");
    }

    public onRegister(registerUser: RegisterUser) {
        this.registrationSubscription = this.authService.register(registerUser.email, registerUser.password).subscribe(
            () => {
                this.ngZone.run(() => {
                    setTimeout(() => this.navigationService.navigate(["/inbox"], { clearHistory: true }), 1);
                })
            },
            error => {
                this.currentUser = new RegisterUser("", "", "");

                const errorMsg = error.indexOf("FirebaseAuthUserCollisionException") > -1 ?
                    "The email address is already in use by another account." :
                    error;

                const options = {
                    title: "Register Error",
                    message: errorMsg,
                    okButtonText: "OK"
                }
                alert(options);
            }
        )
    }

    public ngOnDestroy() {
        if (this.registrationSubscription) {
            this.registrationSubscription.unsubscribe;
        }
    }
}
