import { Optional, SkipSelf, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule has already been loaded. Import Core modules in the AppModule only.");
        }
    }
}
