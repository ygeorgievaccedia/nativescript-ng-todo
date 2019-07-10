import { Component, OnInit } from "@angular/core";
import { NavigationService } from "~/app/core/services/navigation.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "ns-auth-container",
    templateUrl: "./auth-container.component.html",
    styleUrls: ["./auth-container.component.scss"],
    moduleId: module.id
})
export class AuthContainerComponent implements OnInit {
    constructor(
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute) {}

    public ngOnInit() {
        this.navigationService.navigate([{ outlets: { loginTab: ["login"], registerTab: ["register"] } }], {
            relativeTo: this.activatedRoute
        });
    }
}
