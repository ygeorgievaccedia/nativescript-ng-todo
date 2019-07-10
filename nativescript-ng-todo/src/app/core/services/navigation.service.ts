import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoggerService } from './logger.service';
import { NavigationExtras } from '@angular/router';
import { NavigationOptions } from 'nativescript-angular/router/ns-location-strategy';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(
        private readonly routerExtensions: RouterExtensions,
        private readonly loggerService: LoggerService) {}

    public navigate(commands: any[], extras?: NavigationExtras & NavigationOptions): Promise<boolean> {
        this.loggerService.log("NavigationService#navigate");

        return this.routerExtensions.navigate(commands, extras);
    }

    public back() {
        this.loggerService.log("NavigationService#back");
        this.routerExtensions.back();
    }

    public backToPreviousPage() {
        this.loggerService.log("NavigationService#backToPreviousPage");
        this.routerExtensions.backToPreviousPage();
    }
}
