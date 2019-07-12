import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { TodayPageComponent } from "./today-page/today-page.component";
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
    declarations: [
        TodayPageComponent
    ],
    imports: [
        NativeScriptCommonModule,
        TNSFontIconModule,
        SharedModule,
    ],
    exports: [
        TodayPageComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TodayModule {}
