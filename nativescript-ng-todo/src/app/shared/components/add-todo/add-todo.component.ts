import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';
import * as utils from "tns-core-modules/utils/utils";
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { action } from "tns-core-modules/ui/dialogs/dialogs";

import { Todo, Project } from '~/app/core/models/todo.model';
import { DuedateModalComponent } from '../../modals/duedate-modal/duedate-modal.component';
import { PrioritiesModalComponent } from '../../modals/priorities-modal/priorities-modal.component';
import { LabelsModalComponent } from '../../modals/labels-modal/labels-modal.component';
import { GenericInputModalComponent } from '../../modals/generic-input-modal/generic-input-modal.component';
import { ParentModalComponent } from '../../modals/parent-modal/parent-modal.component';
import { DatepickerModalComponent } from '../../modals/datepicker-modal/datepicker-modal.component';

@Component({
    selector: "ns-add-todo",
    templateUrl: "./add-todo.component.html",
    styleUrls: ["./add-todo.component.scss"],
    moduleId: module.id
})
export class AddTodoComponent implements OnInit {
    public todo: Todo;

    @Input() set defaultDueDate(dueDate: Date) {
        this.todo.dueDate = dueDate;
    }
    @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor(
        private readonly page: Page,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRef: ViewContainerRef) {

        this.todo = <Todo>{};
    }

    public ngOnInit() {
        this.focusTitle();
    }

    public async onOpenDuedateModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        }

        const dueDate = await this.modalService.showModal(DuedateModalComponent, options);
        if (dueDate !== undefined) {
            this.todo.dueDate = dueDate;
        }
        this.focusTitle();
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
        this.focusTitle();
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
        this.focusTitle();
    }

    public async onOpenParentModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: { selectedParent: this.todo.parent, currentTodo: this.todo },
            fullscreen: false
        }

        const parent = await this.modalService.showModal(ParentModalComponent, options);
        if (parent !== undefined) {
            this.todo.parent = parent;
        }
        this.focusTitle();
    }

    public async onOpenDescriptionModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {
                title: "Description",
                isTextView: true,
                text: this.todo.description
            },
            fullscreen: true
        }

        const description = await this.modalService.showModal(GenericInputModalComponent, options);
        if (description !== undefined) {
            this.todo.description = description;
        }
        this.focusTitle();
    }

    public async onOpenProjectModal() {
        let options = {
            actions: ["Inbox", "Personal", "Shopping", "Work", "Errands", "Movies to watch"]
        }

        const actionResult = await action(options);
        if (actionResult) {
            this.todo.project = <Project>actionResult;
        }
        this.focusTitle();
    }

    public async onOpenReminderModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: {},
            fullscreen: false
        };

        const reminder = await this.modalService.showModal(DatepickerModalComponent, options);
        if (reminder) {
            this.todo.reminder = reminder;
        }
        this.focusTitle();
    }

    public onAddTodo(){
        this.addTodo.emit(this.todo);
    }

    private focusTitle() {
        const focusTextField: any = this.page.getViewById("todo-title");

        if (focusTextField.ios) {
            focusTextField.focus();
        }

        if (focusTextField.android) {
            setTimeout(() => {
                focusTextField.android.requestFocus();
                const imm = utils.ad.getInputMethodManager();
                imm.showSoftInput(focusTextField.android, 0);
            }, 300);
        }
    }
}
