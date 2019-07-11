import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { SharedModule } from '~/app/shared/shared.module';
import { InboxPageComponent } from './pages/inbox-page/inbox-page.component';

@NgModule({
    declarations: [
        InboxPageComponent
    ],
    imports: [
        NativeScriptCommonModule,
        TNSFontIconModule,
        SharedModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InboxModule {}
