import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SevenDaysPageComponent } from './seven-days-page/seven-days-page.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  declarations: [SevenDaysPageComponent],
  imports: [
    NativeScriptCommonModule,
    TNSFontIconModule,
    SharedModule,
  ],
  exports: [
    SevenDaysPageComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SevenDaysModule { }
