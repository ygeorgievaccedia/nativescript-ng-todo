import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule} from 'nativescript-ui-dataform/angular';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [LoginFormComponent, LoginPageComponent, RegisterFormComponent, RegisterPageComponent, AuthContainerComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule,
        AuthRoutingModule
    ],
    exports: [
        LoginFormComponent,
        RegisterFormComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
