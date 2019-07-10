import { Component, OnInit } from "@angular/core";
import { LoggerService } from "./core/services/logger.service";
import { Store } from './core/state/app-store';
const firebase = require("nativescript-plugin-firebase");

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
        private readonly loggerService: LoggerService) {}

    public ngOnInit() {
        this.loggerService.log("AppComponent#ngOnInit");

        firebase.init({ persist: false });
    }

    public toggleUserOptions() {
        this.expandUserOptions = !this.expandUserOptions;
    }

    public redirectAndCloseDrawer(urlSegment: string) {

    }

    public onLogout() {

    }
}
