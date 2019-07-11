import { Component, OnInit } from "@angular/core";
import { Todo } from '~/app/core/models/todo.model';

@Component({
    selector: "ns-details-page",
    templateUrl: "./details-page.component.html",
    styleUrls: ["./details-page.component.scss"],
    moduleId: module.id
})
export class DetailsPageComponent implements OnInit {
    public todo: Todo;

    constructor() {
        this.todo = <Todo>{};
    }

    ngOnInit() {}

    public goBack() {

    }

    public onDelete() {

    }
}
