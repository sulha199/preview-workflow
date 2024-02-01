/**
 * Please place the code according to the `// #region` comment tag
 *
 * For example `// #region General utils` `// #region Diagram utils`
 */
import { PathAnnotationModel } from '@syncfusion/ej2-angular-diagrams';
import { CanvasItem, CanvasWorkflowItem, InputPin, OutputPin, WorkflowBuilder, WorkflowProperty, WorkflowType } from '@azavista/workflow-builder-shared';
import { FormArray, FormGroup } from '@angular/forms';
import { AzavistaSharedService, IAttributeTranslation } from '@azavista/components/shared';
import { IEventWorkflow } from '@azavista/servicelib';
import { CanvasControllerData, CanvasWorkflowFactory, CustomPaletteType, PaletteSymbol, ValidConnectorModel } from './types';
export declare const omit: <T extends {}, P extends (keyof T)[]>(data: T, properties: P) => Omit<T, P[number]>;
export declare const objectKeys: <O extends {}>(o: O) => (keyof O)[];
export declare const delay: (milliSeconds: number) => Promise<unknown>;
export declare const getGroupByValue: <T extends {
    [x: string]: any;
}, K extends keyof T>(rows: T[], fieldName: K) => { [key in T[K]]?: T[] | undefined; };
export declare const getMapByValue: <T extends {
    [x: string]: any;
}, K extends keyof T>(rows: T[], fieldName: K) => { [key in T[K]]?: T | undefined; };
export declare const isObject: <T>(item: T) => boolean;
/**
 *
 * @param target
 * @param source
 * @returns new object that merged both `target` & `source` with properties from `source` replacing existing `target`'s properties
 */
export declare const mergeDeep: <T extends {}, S extends {}>(target: T, source: S) => T & S;
export declare const trackByWorkflowProperty: (index: number, item: WorkflowProperty) => string;
export declare const trackBy: <T extends {}>(attribute: keyof T) => (index: number, item: T) => T[keyof T];
export declare const trackByAttributeTranslations: (index: number, item: IAttributeTranslation) => string;
export declare const getConnectorAnnotation: (outputPin: OutputPin) => PathAnnotationModel[];
export declare const getValidConnectorsFromWorkfowFactory: (workflows: CanvasWorkflowFactory<WorkflowType>[]) => ValidConnectorModel<OutputPin, string, string>[];
export declare const getDefaultInputPinPort: (type: InputPin) => PointPortModel;
export declare const getDefaultOutputPinPort: (type: OutputPin) => PointPortModel;
export declare const getDefaultNode: () => Omit<NodeModel, 'id'>;
export declare const getWorkflowIdFromNodeId: (nodeId: NodeModel['id']) => string;
export declare const getOutputSidePins: (pins: OutputPin[]) => OutputPin[];
export declare const getOutputNonSidePins: (pins: OutputPin[]) => OutputPin[];
export declare const getMultipleOutputPorts: (pins: OutputPin[]) => PointPortModel[];
export declare const getNodePortsFromFactory: <W extends WorkflowType>(factory: import("@azavista/workflow-builder-shared/lib/workflow").CanvasArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasDeclineWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasEventCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasInvitationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasMultiRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPreArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasProfileWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationAndMembershipWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasStageActionWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasWaitinglistWorkflow) => PointPortModel[];
export declare const getNodeFromCanvasControllerData: <W extends WorkflowType>(data: CanvasControllerData<W>) => NodeModel;
export declare const getNodeAndConnectorsFromCanvasControllerData: (canvasItems: CanvasControllerData<WorkflowType>[]) => Pick<Diagram, 'nodes' | 'connectors'>;
export declare const getWorkflowFactory: <W extends WorkflowType>(type: W, data?: CanvasWorkflowItem) => import("@azavista/workflow-builder-shared/lib/workflow").CanvasArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasDeclineWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasEventCancellationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasInvitationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasMultiRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPaymentWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPreArrivalWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasProfileWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationAndMembershipWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasPublicRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWaitinglistWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasRegistrationWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasStageActionWorkflow | import("@azavista/workflow-builder-shared/lib/workflow").CanvasWaitinglistWorkflow;
export declare const getWorkflowTypeArray: () => WorkflowType[];
export declare const workflowTypeArray: WorkflowType[];
export declare const getOutputPinFromConnector: <O extends OutputPin>(connector: ConnectorModel<O, string, string>) => O;
export declare const reorderWorkflowsByPaletteCategory: (workflows: IEventWorkflow[]) => {
    mainWorkflows: IEventWorkflow[];
    cancellationWorkflows: IEventWorkflow[];
};
export declare const getOrderedIEventWorkflows: (workflows: IEventWorkflow[]) => CanvasItem[];
export declare const getFormDirtyValues: <F extends FormGroup<any>>(form: F) => Partial<F["value"]>;
export declare function createFormGroupFromData<T extends {}>(data: T): T extends any[] ? FormArray : FormGroup;
export declare const getNodeModelForPaletteFromWorkflowType: (workflowType: WorkflowType, sharedSvc: AzavistaSharedService) => NodeModelForPalette<WorkflowType>;
export declare const nodeModelForPaletteCreateWorkBlock: NodeModelForPalette<CustomPaletteType>;
export declare const getNodeModelForPalette: (paletteSymbol: PaletteSymbol, sharedSvc: AzavistaSharedService) => NodeModelForPalette<"create-work-block"> | NodeModelForPalette<WorkflowType>;
export declare const getBuilderWorkflowFromLocalStorage: (eventId: string) => WorkflowBuilder | undefined;
export declare const saveBuilderWorkflowToLocalStorage: (eventId: string, data: WorkflowBuilder) => void;
