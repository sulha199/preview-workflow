import { AzavistaApiService, IEvent } from '@azavista/servicelib';
import { CanvasItem, WorkflowBuilder } from '@azavista/workflow-builder-shared';
import { AzavistaWorkflowBuilderController, ProcessDataSourceCallbacks, WorkflowBuilderProviderAbstract } from '../workflow-builder.controller';
export declare class WorkflowBuilderProviderApi extends WorkflowBuilderProviderAbstract {
    private apiSvc;
    protected controller: AzavistaWorkflowBuilderController;
    cacheService: import("./servicelib-cache.service").AzavistaServiceLibCacheProxy<("getAllEventAssets" | "getEventSettings" | "getAllEvents" | "getEvent" | "getAllEventEmailCampaigns" | "getAllEventFields" | "getAllEventParticipantFields" | "getAllPages" | "searchTeams" | "getAllUsers" | "getProcess" | "searchIntegrations")[]>;
    dataSourceCallbacks: WorkflowBuilderProviderAbstract['dataSourceCallbacks'];
    processDataSourceCallback: ProcessDataSourceCallbacks;
    constructor(apiSvc: AzavistaApiService, controller: AzavistaWorkflowBuilderController);
    private getAllPageForms;
    private getAllPagesNonForm;
    getAllWorkflowsForInit(eventId: string): Promise<CanvasItem[]>;
    saveBuilderData(eventId: string, data: WorkflowBuilder): Promise<void>;
    publishBuilderData(eventId: string, data: WorkflowBuilder): Promise<void>;
    getProcessDataSourceEvent(eventId: string): ReturnType<ProcessDataSourceCallbacks['event']>;
    getEventTeams(event: IEvent): Promise<import("@azavista/servicelib").ITeam[] | undefined>;
    getTemplateEvents(event: IEvent): Promise<IEvent[] | undefined>;
}
