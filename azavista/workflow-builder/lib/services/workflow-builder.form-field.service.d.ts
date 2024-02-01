import { AzavistaSharedService, IAttributeTranslation, IField } from '@azavista/components/shared';
import { WorkflowProperty, WorkflowPropertyWithSchema, WorkflowType } from '@azavista/workflow-builder-shared';
import { IEmailCampaign } from '@azavista/servicelib';
import { TranslateService } from '@ngx-translate/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IBasicPage, CanvasWorkflowFactory } from '../types';
import { WorkflowBuilderProviderAbstract, WorkflowPropertyDataSourceMaps, WorkflowPropertyDataSourceType } from '../workflow-builder.controller';
import * as i0 from "@angular/core";
type DataSourceOptions = {
    eventId: string;
    workflowId: string;
};
export declare class AzavistaWorkflowBuilderFormFieldService {
    private sharedSvc;
    private translateSvc;
    getPageAttributeTranslation: (pages: IBasicPage[]) => IAttributeTranslation[];
    getWorkflowAttributeTranslations: (workflows: CanvasWorkflowFactory<WorkflowType>[], skippedId?: string[]) => IAttributeTranslation[];
    getEmailCampaignAttributeTranslations: (emails: IEmailCampaign[]) => IAttributeTranslation[];
    getCrmAttributeTranslations: () => IAttributeTranslation[];
    translationsMapCallback: {
        [key in WorkflowPropertyDataSourceType]: (rows: Array<WorkflowPropertyDataSourceMaps[key]>) => IAttributeTranslation[];
    };
    constructor(sharedSvc: AzavistaSharedService, translateSvc: TranslateService);
    getFormGroupFromWorkflowFactory(properties: WorkflowProperty[], factory: CanvasWorkflowFactory<WorkflowType>): FormGroup<any>;
    getFormControlFromWorkflowProperty<D extends WorkflowPropertyWithSchema['datasource']>(property: WorkflowPropertyWithSchema & {
        datasource: D;
    }, factory: CanvasWorkflowFactory<WorkflowType>): FormControl | FormArray;
    getFieldFromWorkflowProperty<D extends WorkflowPropertyWithSchema['datasource']>(property: WorkflowPropertyWithSchema & {
        datasource: D;
    }, provider: WorkflowBuilderProviderAbstract, options: DataSourceOptions): Promise<IField>;
    getFieldDataSourceTranslations<D extends WorkflowPropertyDataSourceType>(dataSource: D, provider: WorkflowBuilderProviderAbstract, options: DataSourceOptions): Promise<IAttributeTranslation[]>;
    getCanvasDataFields: <T extends WorkflowType>(workflowType: T) => IField[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AzavistaWorkflowBuilderFormFieldService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AzavistaWorkflowBuilderFormFieldService>;
}
export {};
