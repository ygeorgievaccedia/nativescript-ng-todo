import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { LoggerService } from "./logger.service";
import { UploadFileResult, ProgressStatus } from "nativescript-plugin-firebase/storage/storage";

@Injectable({
    providedIn: "root"
})
export class FileRepositoryService {
    constructor(private readonly loggerService: LoggerService) {}

    public uploadUserProfilePicture(localFullPath: string, remoteFullPath: string): Promise<UploadFileResult> {
        return firebase.storage.uploadFile({
            remoteFullPath: remoteFullPath,
            localFullPath: localFullPath,
            onProgress: (status: ProgressStatus) => {
                this.loggerService.log("Uploaded fraction: " + status.fractionCompleted);
                this.loggerService.log("Percentage complete: " + status.percentageCompleted);
            }
        });
    }

    public getDownloadURL(remoteFullPath: string): Promise<string> {
        return firebase.storage.getDownloadUrl({
            remoteFullPath: remoteFullPath
        });
    }
}
