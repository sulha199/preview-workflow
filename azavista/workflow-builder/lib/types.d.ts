import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IEventWorkflow, ILanguageItem, IPage } from '@azavista/servicelib';
import { Canvas, CanvasItem, InputPin, OutputPin, WorkflowType } from '@azavista/workflow-builder-shared';
import { getCanvasWorkflow } from '@azavista/workflow-builder-shared/lib/factory';
import { ConnectorModel as ConnectorModelSyncfusion, NodeModel as NodeModelSyncfusion, PointPortModel as PointPortModelSyncfusion, Diagram as DiagramSyncfusion, Connector } from '@syncfusion/ej2-angular-diagrams';
export declare const PREFIX_NODE: "node_";
export declare const PREFIX_PORT: "port_";
export declare const PREFIX_CONNECTOR: "connector_";
export declare const DEFAULT_NODE_WIDTH: 250;
export declare const DEFAULT_NODE_HEIGHT: 150;
export declare const DEFAULT_STROKE_WIDTH = 2;
export declare const DEFAULT_STROKE_COLOR = "#aaa";
export declare const DEFAULT_SELECTED_STROKE_COLOR = "blue";
export declare const DEFAULT_ERROR_STROKE_COLOR = "#f00";
export declare const DEFAULT_CONNECTOR: ConnectorModel<OutputPin.OUTPUT>;
export declare const OUTPUT_PIN_PAIR: {
    readonly output: InputPin.INPUT;
    readonly "cancellation-output": InputPin.CANCELLATION_INPUT;
    readonly "decline-output": InputPin.DECLINE_INPUT;
    readonly "existing-contact": InputPin.INPUT;
    readonly "invited-contact": InputPin.INPUT;
    readonly "new-contact": InputPin.INPUT;
};
export type CustomPaletteType = 'create-work-block';
export type PaletteSymbol = WorkflowType | CustomPaletteType;
declare global {
    export type PortIdInputModel<T extends InputPin = InputPin> = `${typeof PREFIX_PORT}_${T}_pin`;
    export type PortIdOutputModel<T extends OutputPin = OutputPin> = `${typeof PREFIX_PORT}_${T}_pin`;
    export type PortIdModel = PortIdInputModel | PortIdOutputModel;
    export interface PointPortModel extends PointPortModelSyncfusion {
        /**
         * Defines the unique id of the port with the pin type
         */
        id: PortIdModel;
    }
    export type NodeIdModel<NodeId extends string = string> = `${typeof PREFIX_NODE}${NodeId}`;
    export interface NodeModel<NodeId extends string = string> extends NodeModelSyncfusion {
        id: NodeIdModel<NodeId>;
        /**
         * Defines the collection of connection points of nodes/connectors
         */
        ports: PointPortModel[];
        shape: {
            type: 'HTML';
            content?: string;
        };
    }
    export type NodeModelForPalette<NodeId extends PaletteSymbol = WorkflowType> = Omit<NodeModel<NodeId>, 'id' | 'addInfo'> & {
        id: NodeId;
        addInfo: {
            type: NodeId;
            label: string;
        };
    };
    export interface ConnectorModel<Output extends OutputPin = OutputPin, SourceId extends string = string, TargetId extends string = string> extends ConnectorModelSyncfusion {
        sourceID?: NodeIdModel<SourceId>;
        sourcePortID: PortIdOutputModel<Output>;
        targetID?: NodeIdModel<TargetId>;
        targetPortID: PortIdInputModel<(typeof OUTPUT_PIN_PAIR)[Output]>;
    }
    export class Diagram extends DiagramSyncfusion {
        nodes: NodeModel<string>[];
    }
}
export type Coordinate = {
    x: number;
    y: number;
};
export type WorkflowItemDiagramData = {
    id: string;
    diagram: {
        position: Coordinate;
    };
    workflow: IEventWorkflow;
};
export type DraftConnectorPosition = {
    stageId: string;
    coordinate?: never;
} | {
    stageId?: never;
    coordinate: Coordinate;
};
export type DraftConnector = {
    source: DraftConnectorPosition;
    target: DraftConnectorPosition;
};
export type WorkflowBuilderData = {
    workflows: CanvasItem[];
    draftConnectors: DraftConnector[];
};
export type SaveWorkflowStageDraft = WorkflowBuilderData;
export type PublishWorkflowStage = WorkflowBuilderData;
export type IBasicPage = Omit<IPage, 'grapes_json' | 'page_subtype' | 'page_type' | 'footer_page_id'> & {
    footer_page_id?: IPage['footer_page_id'] | null;
};
export type ValidConnectorModel<Output extends OutputPin, SourceId extends string = string, TargetId extends string = string> = ConnectorModel<Output, SourceId, TargetId> & {
    sourceID: NodeIdModel<SourceId>;
    targetID: NodeIdModel<TargetId>;
    sourcePortID: PortIdOutputModel<Output>;
    targetPortID: PortIdInputModel<(typeof OUTPUT_PIN_PAIR)[Output]>;
};
export type DiagramEventBase = {
    state: 'Start' | 'Progress' | 'Completed';
};
export type ConnectionPointChangeEvent = DiagramEventBase & {
    connector: Connector;
};
export type ElementDrawConnectorEvent = DiagramEventBase & {
    objectType: 'Connector';
    source: Connector;
};
export type ElementDrawEvent = ElementDrawConnectorEvent;
export type CanvasWorkflowFactory<T extends WorkflowType> = ReturnType<typeof getCanvasWorkflow<T>>;
export type CanvasControllerData<W extends WorkflowType> = {
    factory: CanvasWorkflowFactory<W>;
} & Canvas;
export type CanvasWorkflowMap<T> = {
    [workflowId: string]: T;
};
export type WorkflowPropertyType = 'select' | 'multiselect' | 'text' | 'boolean' | 'number';
export declare const WORKFLOW_NAME_TRANSLATIONS: Record<WorkflowType | CustomPaletteType, `${string}_NAME`>;
export declare const WORKFLOW_EXPLANATION_TRANSLATIONS: Record<WorkflowType, `${string}_EXPLANATION`>;
export type ControlType<Model> = Model extends any[] ? ArrayControlType<Model[number]> : Model extends {
    [key: string]: any;
} ? FormGroup<FormGroupType<Model>> : FormControl<Model | null>;
type ArrayControlType<Row> = FormArray<ControlType<Row>>;
/** Generate Form-Group type using interface/type */
export type FormGroupType<Model extends {
    [key: string]: any;
}> = {
    [K in keyof Required<Model>]: ControlType<Model[K]>;
};
export declare const enum ProcessType {
    participant = "participant",
    event = "event",
    booking = "booking"
}
export declare const ISO_LANGUAGES: ILanguageItem[];
export declare const PALETTE_CATEGORIES_ORDER: readonly ["INVITATION_WORKFLOWS", "REGISTRATION_WORKFLOWS", "WAITING_LIST_WORKFLOWS", "CANCELLATION_WORKFLOWS", "PAYMENT_WORKFLOWS", "OTHER_WORKFLOWS"];
export type PaletteCategory = (typeof PALETTE_CATEGORIES_ORDER)[number];
export declare const PALETTE_CATEGORIES_INDEX: Record<PaletteCategory, number>;
export declare const WORKFLOW_TYPE_CATEGORIES: Record<PaletteSymbol, PaletteCategory[]>;
export declare const WORKFLOW_TYPE_ORDER: Record<WorkflowType, number>;
export type PaletteCategoryMap = Partial<Record<PaletteCategory, PaletteSymbol[]>>;
export declare const getPaletteCategoryMap: () => PaletteCategoryMap;
export declare const PALETTE_CATEGORIES_MAP: Partial<Record<"INVITATION_WORKFLOWS" | "REGISTRATION_WORKFLOWS" | "WAITING_LIST_WORKFLOWS" | "CANCELLATION_WORKFLOWS" | "PAYMENT_WORKFLOWS" | "OTHER_WORKFLOWS", PaletteSymbol[]>>;
export {};
