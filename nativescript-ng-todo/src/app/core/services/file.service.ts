import { Injectable } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";

import { FileRepositoryService } from './file-repository.service';
import { Store } from '../state/app-store';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

@Injectable({
    providedIn: "root"
})
export class FileService {
    constructor(
        private readonly repository: FileRepositoryService,
        private readonly store: Store) {}

    public async uploadUserProfilePicture(localFullPath: string) {
        const currentUser = this.store.value.currentUser;
        const imageName = localFullPath.substring(localFullPath.lastIndexOf("/") + 1, localFullPath.length);
        const remoteFullPath = `users/${currentUser.uid}/${imageName}`;

        await this.repository.uploadUserProfilePicture(localFullPath, remoteFullPath);
        const remoteURL = await this.getDownloadURL(remoteFullPath);

        return remoteURL;
    }

    public async selectImageFromPhone() {
        const context = imagepicker.create({
            mode: "single"
        });

        await context.authorize();
        const images: ImageAsset[] = await context.present();
        const imageURL = images.length > 0 ? images[0] : null;

        return imageURL;
    }

    public getDownloadURL(remoteFullPath: string): Promise<string> {
        return this.repository.getDownloadURL(remoteFullPath);
    }
}
