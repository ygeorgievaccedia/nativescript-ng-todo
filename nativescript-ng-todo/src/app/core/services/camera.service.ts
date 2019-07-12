import { Injectable } from "@angular/core";
import * as camera from "nativescript-camera";

import { LoggerService } from "./logger.service";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

@Injectable({
    providedIn: "root"
})
export class CameraService {
    constructor(private readonly loggerService: LoggerService) {}

    public async takePicture(): Promise<ImageAsset> {
        try {
            await camera.requestPermissions();
            const cameraOptions: camera.CameraOptions = {
                width: 300,
                height: 300,
                keepAspectRatio: false,
                saveToGallery: true
            };

            try {
                const imageAsset = await camera.takePicture(cameraOptions);

                return imageAsset;
            } catch (error) {
                this.loggerService.error(error);
            }
        } catch {
            this.loggerService.error("Camera permissions rejected");
        }
    }
}
