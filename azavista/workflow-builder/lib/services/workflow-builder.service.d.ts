import { AzavistaApiService } from '@azavista/servicelib';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AzavistaWorkflowBuilderController, WorkflowBuilderProviderAbstract } from '../workflow-builder.controller';
import * as i0 from "@angular/core";
export declare class WorkflowBuilderService {
    private apiSvc;
    private controller;
    private translate;
    dataProvider: WorkflowBuilderProviderAbstract;
    constructor(apiSvc: AzavistaApiService, controller: AzavistaWorkflowBuilderController, translate: TranslateService);
    translationsLoaded(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WorkflowBuilderService>;
}
