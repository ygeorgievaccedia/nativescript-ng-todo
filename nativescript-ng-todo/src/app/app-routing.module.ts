import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { InboxPageComponent } from './modules/inbox/pages/inbox-page/inbox-page.component';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { DetailsPageComponent } from './modules/details/pages/details-page/details-page.component';
import { TodayPageComponent } from './modules/today/today-page/today-page.component';
import { SevenDaysPageComponent } from './modules/seven-days/seven-days-page/seven-days-page.component';
import { SearchPageComponent } from './modules/search/search-page/search-page.component';

const routes: Routes = [
    { path: "", redirectTo: "/inbox", pathMatch: "full" },
    { path: "inbox", component: InboxPageComponent, canActivate: [AuthGuard] },
    { path: "today", component: TodayPageComponent, canActivate: [AuthGuard] },
    { path: "seven-days", component: SevenDaysPageComponent, canActivate: [AuthGuard] },
    { path: "todo-details/:id", component: DetailsPageComponent, canActivate: [AuthGuard] },
    { path: "search", component: SearchPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
