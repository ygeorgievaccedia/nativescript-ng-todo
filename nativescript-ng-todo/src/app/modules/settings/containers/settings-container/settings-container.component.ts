import { Component } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    selector: "ns-settings-container",
    templateUrl: "./settings-container.component.html",
    styleUrls: ["./settings-container.component.scss"],
    moduleId: module.id
})
export class SettingsContainerComponent {
    constructor(private readonly page: Page) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
    }
}
