import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    NativeScriptCommonModule,
    TNSFontIconModule,
    SharedModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
