import { Component, OnInit } from "@angular/core";

import { Store } from '~/app/core/state/app-store';

@Component({
    selector: "ns-inbox-page",
    templateUrl: "./inbox-page.component.html",
    styleUrls: ["./inbox-page.component.scss"],
    moduleId: module.id
})
export class InboxPageComponent{
    public currentUser$ = this.store.select<any>("currentUser");

    constructor(private readonly store: Store) {}
}
