import { Injectable, NgZone } from '@angular/core';
import { AccountRepositoryService } from './account-repository.service';
import { Store } from '~/app/core/state/app-store';
import { ServerErrorHandlerService } from '~/app/core/services/server-error-handler.service';
import { LoggerService } from '~/app/core/services/logger.service';

@Injectable()
export class AccountService {
    constructor(
        private readonly repository: AccountRepositoryService,
        private readonly store: Store,
        private readonly errorHandlerService: ServerErrorHandlerService,
        private readonly loggerService: LoggerService,
        private readonly ngZone: NgZone) { }

    public updateProfileIMG(photoURL: string): void {
        const currentUser = this.store.value.currentUser;

        this.repository.updateProfile(currentUser.displayName, photoURL, this.errorHandlerService.handleFirestoreError, () => {
            this.ngZone.run(() => {
                currentUser.photoURL = photoURL;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user photo url");
            })
        })
    }

    public updateDisplayName(displayName: string): void {
        const currentUser = this.store.value.currentUser;

        this.repository.updateProfile(displayName, currentUser.photoURL, this.errorHandlerService.handleFirestoreError, () => {
            this.ngZone.run(() => {
                currentUser.displayName = displayName;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user display name");
            })
        })
    }

    public updateEmail(email: string): void {
        this.repository.updateEmail(email, this.errorHandlerService.handleFirestoreError, () => {
            this.ngZone.run(() => {
                const currentUser = this.store.value.currentUser;
                currentUser.email = email;
                this.store.set("currentUser", currentUser);
                this.loggerService.log("Changed user email");
            });
        })
    }

    public updatePassword(password: string): void {
        this.repository.updatePassword(password, this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Changed user password");
        })
    }

    public deleteAccount() {
        this.repository.deleteAccount(this.errorHandlerService.handleFirestoreError, () => {
            this.loggerService.log("Deleted user account");
        })
    }
}
