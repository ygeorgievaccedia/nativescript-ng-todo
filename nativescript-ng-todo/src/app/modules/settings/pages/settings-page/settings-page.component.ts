import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Store } from '~/app/core/state/app-store';
import { LoggerService } from '~/app/core/services/logger.service';
import { NavigationService } from '~/app/core/services/navigation.service';
import { AuthService } from '~/app/modules/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "ns-settings-page",
    templateUrl: "./settings-page.component.html",
    styleUrls: ["./settings-page.component.scss"],
    moduleId: module.id
})
export class SettingsPageComponent {
    public currentUser$ = this.store.select<any>("currentUser");

    constructor(
        private readonly authService: AuthService,
        private readonly store: Store,
        private readonly loggerService: LoggerService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute) {}

    public onNavigate(urlSegment: string) {
        this.navigationService.navigate([urlSegment], { transition: { name: "slideLeft"}, relativeTo: this.activatedRoute });
    }

    public onRestoreAllDefaults() {

    }

    public async onLogout() {
        await this.authService.logout();
        this.navigationService.navigate(["auth"], { clearHistory: true });
    }

    public onDrawerButton() {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }
}
