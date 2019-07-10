import { Component, OnDestroy } from "@angular/core";
import { LoginUser } from "~/app/core/models/login-user.model";
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '~/app/core/services/navigation.service';
import { LoggerService } from '~/app/core/services/logger.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "ns-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"],
    moduleId: module.id
})
export class LoginPageComponent implements OnDestroy {
    public currentUser: LoginUser;

    private loginSubscription: Subscription;

    constructor(
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly loggerService: LoggerService
    ) {
        this.currentUser = new LoginUser("", "");
    }

    public onLogin(loginUser: LoginUser) {
        // show loading

        this.loginSubscription = this.authService.login(loginUser.email, loginUser.password).subscribe(
            () => {
                this.navigationService.navigate(["/inbox"], { transition: { name: "slideLeft" }, clearHistory: true });
            },
            error => {
                this.currentUser = new LoginUser(this.currentUser.email, "");

                const options = {
                    title: "Login Error",
                    message: "Invalid email or password",
                    okButtonText: "OK"
                }
                alert(options);
            }
        )
    }

    public ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
