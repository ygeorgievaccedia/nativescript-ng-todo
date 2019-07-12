import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { SharedModule } from '~/app/shared/shared.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    declarations: [
        DetailsPageComponent,
        DetailsFormComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TNSFontIconModule,
        SharedModule,
    ],
    exports: [
        DetailsPageComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DetailsModule {}
