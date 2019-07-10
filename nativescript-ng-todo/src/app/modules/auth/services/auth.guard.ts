import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { NavigationService } from '~/app/core/services/navigation.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly navigationService: NavigationService,
        private readonly authService: AuthService) {}

    public canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.navigationService.navigate(["/auth"], {
                clearHistory: true
            })
            return false;
        }
    }
}
