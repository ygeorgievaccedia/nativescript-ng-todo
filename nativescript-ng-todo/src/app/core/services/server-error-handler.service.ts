import { Injectable } from "@angular/core";
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: "root"
})
export class ServerErrorHandlerService {
    constructor(private readonly loggerService: LoggerService) {}

    public handleFirestoreError(error: any) {
        this.loggerService.error(error);
    }
}
