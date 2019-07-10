import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule} from 'nativescript-ui-dataform/angular';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIDataFormModule
  ],
  exports: [LoginFormComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
