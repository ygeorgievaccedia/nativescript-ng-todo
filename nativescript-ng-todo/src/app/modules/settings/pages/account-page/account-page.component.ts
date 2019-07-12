import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import * as firebase from "nativescript-plugin-firebase";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { confirm, action } from "tns-core-modules/ui/dialogs";

import { Store } from '~/app/core/state/app-store';
import { GenericInputModalComponent } from '~/app/shared/modals/generic-input-modal/generic-input-modal.component';
import { AccountService } from '../../services/account.service';
import { AuthService } from '~/app/modules/auth/services/auth.service';
import { NavigationService } from '~/app/core/services/navigation.service';
import { CameraService } from '~/app/core/services/camera.service';
import { FileService } from '~/app/core/services/file.service';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

@Component({
    selector: "ns-account-page",
    templateUrl: "./account-page.component.html",
    styleUrls: ["./account-page.component.scss"],
    moduleId: module.id
})
export class AccountPageComponent {
    public currentUser$ = this.store.select<firebase.User>("currentUser");

    constructor(
        private readonly store: Store,
        private readonly modalService: ModalDialogService,
        private readonly viewContainerRed: ViewContainerRef,
        private readonly accountService: AccountService,
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly cameraService: CameraService,
        private readonly fileService: FileService) {}

    public async onChangeAvatar() {
        const options = {
            actions: ["Take photo", "Choose photo", "Remove current photo"]
        };

        const actionResult = await action(options);
        if (actionResult === "Take photo") {
            const imageAsset: ImageAsset = await this.cameraService.takePicture();
            const imageURL = await this.fileService.uploadUserProfilePicture(imageAsset.android);
            this.accountService.updateProfileIMG(imageURL);
        } else if (actionResult === "Choose photo") {
            const imageAsset: ImageAsset = await this.fileService.selectImageFromPhone();
            const imageURL = await this.fileService.uploadUserProfilePicture(imageAsset.android);
            this.accountService.updateProfileIMG(imageURL);
        } else if (actionResult === "Remove current photo") {
            this.accountService.updateProfileIMG("");
            // DELETE USER profile image from firebase storage
        }
    }

    public async onChangeDisplayName() {
        const currentUser = this.store.value.currentUser;

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRed,
            context: { title: "Type your name", text: currentUser.displayName },
            fullscreen: false
        };
        const newDisplayName: string = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newDisplayName) {
            this.accountService.updateDisplayName(newDisplayName);
        }
    }

    public async onChangeEmail() {
        const currentUser = this.store.value.currentUser;

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRed,
            context: { title: "Email", text: currentUser.email },
            fullscreen: false
        };
        const newEmail: string = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newEmail) {
            this.accountService.updateEmail(newEmail);
        }
    }

    public async onChangePassword() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRed,
            context: { title: "Password", isPassword: true },
            fullscreen: false
        };
        const newPassword: string = await this.modalService.showModal(GenericInputModalComponent, options);
        if (newPassword) {
            this.accountService.updatePassword(newPassword);
        }
    }

    public async onDeleteAccount() {
        const options = {
            title: "Confirmation required",
            message: "Are you sure you want to DELETE your account? This cannot be undone.",
            okButtonText: "Delete",
            cancelButtonText: "No"
        }

        const shouldDelete = await confirm(options);
        if (shouldDelete) {
            await this.accountService.deleteAccount();
            await this.authService.logout();
            this.navigationService.navigate(["auth"], { clearHistory: true });
        }
    }

    public onDrawerButton() {
        const sidedrawer = <RadSideDrawer>app.getRootView();
        sidedrawer.showDrawer();
    }
}
