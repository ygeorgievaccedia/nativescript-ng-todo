import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Button } from 'tns-core-modules/ui/button/button';
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";

import { Todo } from "~/app/core/models/todo.model";

@Component({
    selector: "ns-details-form",
    templateUrl: "./details-form.component.html",
    styleUrls: ["./details-form.component.scss"],
    moduleId: module.id
})
export class DetailsFormComponent implements OnInit {
    @Input() todo: Todo;

    @ViewChild("saveButton", { static: false }) set saveButton(content: ElementRef) {
        if (content) {
            const button = <Button>content.nativeElement;
            AbsoluteLayout.setTop(button, 125);
            AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
        }
    }

    constructor() {}

    ngOnInit() {}

    public onOpenDuedataModal() {

    }
    public onSave() {}

    public onDelete() {

    }
}
