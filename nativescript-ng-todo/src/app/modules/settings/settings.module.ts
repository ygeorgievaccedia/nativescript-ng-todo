import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingsContainerComponent } from './containers/settings-container/settings-container.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '~/app/shared/shared.module';
import { AccountRepositoryService } from './services/account-repository.service';
import { AccountService } from './services/account.service';

@NgModule({
    declarations: [
        SettingsContainerComponent,
        SettingsPageComponent,
        AccountPageComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        TNSFontIconModule,
        SharedModule,
    ],
    providers: [
        AccountRepositoryService,
        AccountService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule {}
