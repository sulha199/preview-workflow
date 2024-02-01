import { Canvas, CanvasItem, CanvasWorkflowItem, Coordinate, OutputPin, WorkflowBuilder, WorkflowSettings, WorkflowType, WorkflowPropertySelect } from '@azavista/workflow-builder-shared';
import { IAsset, IEmailCampaign, IEvent, IEventSettings, IIntegration, IPage, ITeam, IUser, Step } from '@azavista/servicelib';
import { CrmStatus } from '@azavista/azavista-types';
import { BehaviorSubject } from 'rxjs';
import { IField } from '@azavista/components/shared';
import { CanvasWorkflowFactory, WorkflowBuilderData, CanvasControllerData, CanvasWorkflowMap } from './types';
import * as i0 from "@angular/core";
export type WorkflowPropertyDataSourceType = WorkflowPropertySelect['datasource'];
export type WorkflowPropertyDataSourceMaps = {
    Form: IPage;
    Page: IPage;
    Email: IEmailCampaign;
    CrmStatus: CrmStatus;
    Workflow: CanvasWorkflowFactory<WorkflowType>;
    ProfilePage: IPage;
};
export declare const getCrmStatusArray: () => CrmStatus[];
export declare const crmStatusArray: CrmStatus[];
export declare class AzavistaWorkflowBuilderController {
    dataMap: CanvasWorkflowMap<CanvasControllerData<WorkflowType>>;
    validityMap: CanvasWorkflowMap<boolean>;
    dataProvider?: WorkflowBuilderProviderAbstract;
    eventId?: string;
    initStatus$: BehaviorSubject<"completed" | "processing" | undefined>;
    isDebugCallback?: () => boolean;
    initFromProvider(dataProvider: WorkflowBuilderProviderAbstract, eventId: string): Promise<void>;
    init(workflowData: WorkflowBuilder | null): void;
    addWorkflow<W extends WorkflowType>(type: W, canvas: Canvas, data?: CanvasWorkflowItem): {
        coordinate: Coordinate;
        name: string;
        description: string;
        factory: import("@azavista/workflow-builder-shared/lib/workflow").CanvasArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasDeclineWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasEventCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasInvitationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasMultiRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPreArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasProfileWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationAndMembershipWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasStageActionWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasWaitinglistWorkflow;
    };
    updateWorkflowSettings<T extends WorkflowType>(workflowId: string, data: WorkflowSettings<T>): void;
    updateWorkflowCoordinate(workflowId: string, coordinate: Coordinate): void;
    updateWorkflowNextWorkflow(outputType: OutputPin, sourceWorkflowId: string | null, targetWorkflowId: string | null): void;
    updateWorkflowCanvas(workflowId: string, data: Partial<Canvas>): void;
    updateWorkflowProcess(workflowId: string, attribute: string, steps: Step[]): void;
    isValidNextWorkflow(outputType: OutputPin, sourceWorkflowId: string | null, targetWorkflowId: string | null, isNewConnection?: boolean): boolean;
    deleteWorkflow(workflowId: string): void;
    getCurrentState(): WorkflowBuilder;
    save(): Promise<void>;
    publish(): Promise<void>;
    getInitializedWorkflowsMap(): Promise<CanvasWorkflowMap<CanvasControllerData<WorkflowType>>>;
    log(logName: string, ...params: any[]): void;
    private updateValidityMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<AzavistaWorkflowBuilderController, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AzavistaWorkflowBuilderController>;
}
export type WorkflowBuilderDataSourceCallbacksOptions = {
    skippedWorkflowIds: string[];
};
export type ProcessDataSourceCallbacks = {
    users: () => Promise<IUser[]>;
    integrations: () => Promise<Omit<IIntegration, 'settings'>[]>;
    getEventFields: (eventId: string) => Promise<IField[]>;
    event: (eventId: string) => Promise<{
        detail: IEvent;
        teams: ITeam[] | undefined;
        templateEvents: IEvent[] | undefined;
        participantFields: IField[];
        assets: IAsset[];
        settings: IEventSettings;
    }>;
};
export declare abstract class WorkflowBuilderProviderAbstract {
    protected workflowController: AzavistaWorkflowBuilderController;
    constructor(workflowController: AzavistaWorkflowBuilderController);
    abstract dataSourceCallbacks: {
        [dataSource in WorkflowPropertyDataSourceType]: (eventId: string, options: WorkflowBuilderDataSourceCallbacksOptions) => Promise<WorkflowPropertyDataSourceMaps[dataSource][]>;
    };
    abstract processDataSourceCallback: ProcessDataSourceCallbacks;
    abstract getAllWorkflowsForInit(eventId: string): Promise<CanvasItem[]>;
    abstract saveBuilderData(eventId: string, data: WorkflowBuilder): Promise<void>;
    abstract publishBuilderData(eventId: string, data: WorkflowBuilder): Promise<void>;
    getBuilderData(eventId: string): Promise<WorkflowBuilderData>;
    getAllWorkflowsForDataSource(skippedWorkflowIds: string[]): Promise<(import("@azavista/workflow-builder-shared/lib/workflow").CanvasArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasDeclineWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasEventCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasInvitationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasMultiRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPreArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasProfileWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationAndMembershipWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasStageActionWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasWaitinglistWorkflow)[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderProviderAbstract, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WorkflowBuilderProviderAbstract>;
}
