import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { InboxPageComponent } from './pages/inbox-page/inbox-page.component';

@NgModule({
    declarations: [InboxPageComponent],
    imports: [NativeScriptCommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InboxModule {}
