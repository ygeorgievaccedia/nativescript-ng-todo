import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsContainerComponent } from './containers/settings-container/settings-container.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
    {
        path: "settings",
        component: SettingsContainerComponent,
        children: [
            {
                path: "",
                component: SettingsPageComponent
            },
            {
                path: "account",
                component: AccountPageComponent
            }
        ]
    }
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}
