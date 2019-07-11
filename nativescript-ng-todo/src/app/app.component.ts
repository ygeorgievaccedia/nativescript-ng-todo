import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
const firebase = require("nativescript-plugin-firebase");

import { LoggerService } from "./core/services/logger.service";
import { Store } from './core/state/app-store';
import { NavigationService } from './core/services/navigation.service';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    public currentUser$ = this.store.select<any>("currentUser");
    public expandUserOptions: boolean = false;

    constructor(
        private readonly store: Store,
        private readonly loggerService: LoggerService,
        private readonly navigationService: NavigationService,
        private readonly authService: AuthService) {}

    public ngOnInit() {
        this.loggerService.log("AppComponent#ngOnInit");

        firebase.init({ persist: false });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }

    public redirectAndCloseDrawer(urlSegment: string) {
        this.closeDrawer();
        this.expandUserOptions = false;
        this.navigationService.navigate([urlSegment], { transition: { name: "slideLeft" }});
    }

    public async onLogout() {
        await this.authService.logout();
        this.closeDrawer();
        this.navigationService.navigate(["auth"], { clearHistory: true });
    }

    private closeDrawer() {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.closeDrawer();
    }
}
