import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, ViewContainerRef } from "@angular/core";
import { Button } from 'tns-core-modules/ui/button/button';
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";

import { Todo } from "~/app/core/models/todo.model";
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DuedateModalComponent } from '~/app/shared/modals/duedate-modal/duedate-modal.component';
import { PrioritiesModalComponent } from '~/app/shared/modals/priorities-modal/priorities-modal.component';
import { LabelsModalComponent } from '~/app/shared/modals/labels-modal/labels-modal.component';

@Component({
    selector: "ns-details-form",
    templateUrl: "./details-form.component.html",
    styleUrls: ["./details-form.component.scss"],
    moduleId: module.id
})
export class DetailsFormComponent implements OnInit {
    @Input() todo: Todo;
    @Output() save: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() delete: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild("saveButton", { static: false }) set saveButton(content: ElementRef) {
        if (content) {
            const button = <Button>content.nativeElement;
            AbsoluteLayout.setTop(button, 125);
            AbsoluteLayout.setLeft(button, screen.mainScreen.widthDIPs - Number(button.width) - 20);
        }
    }

    constructor(
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {}

    ngOnInit() {}

    public async onOpenDuedataModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        }

        const dueDate = await this.modalService.showModal(DuedateModalComponent, options);
        if (dueDate !== undefined) {
            this.todo.dueDate = dueDate;
        }
    }

    public async onOpenPrioritiesModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        }

        const priority = await this.modalService.showModal(PrioritiesModalComponent, options);
        if (priority !== undefined) {
            this.todo.priority = priority;
        }
    }

    public async onOpenLabelsModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { selectedLabels: this.todo.labels },
            fullscreen: false
        }

        const labels = await this.modalService.showModal(LabelsModalComponent, options);
        if (labels !== undefined) {
            this.todo.labels = labels;
        }
    }

    public onSave() {
        this.save.emit(this.todo);
    }

    public onDelete() {
        this.delete.emit();
    }
}
