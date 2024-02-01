import { AfterViewInit, ElementRef, OnInit, QueryList } from '@angular/core';
import { DiagramTools, ICollectionChangeEventArgs, IConnectionChangeEventArgs, IDraggingEventArgs, IElementDrawEventArgs, IScrollChangeEventArgs, ISelectionChangeEventArgs, SymbolPaletteComponent, NodeModel as NodeModelSyncfusion } from '@syncfusion/ej2-angular-diagrams';
import { NgResizeObserver } from 'ng-resize-observer';
import { AzavistaSharedService, IValueChangesWithObject } from '@azavista/components/shared';
import { Canvas } from '@azavista/workflow-builder-shared';
import { ConnectionPointChangeEvent } from './types';
import { WorkflowBuilderService } from './services/workflow-builder.service';
import { AzavistaWorkflowBuilderController, WorkflowBuilderProviderAbstract } from './workflow-builder.controller';
import { WorkflowBuilderNodeFormComponent } from './components/workflow-builder-node-form/workflow-builder-node-form.component';
import * as i0 from "@angular/core";
export declare const ZOOM_FACTOR_OPTIONS: number[];
export declare class WorkflowBuilderComponent implements OnInit, AfterViewInit {
    private builderSvc;
    controller: AzavistaWorkflowBuilderController;
    private host;
    private resize$;
    private sharedSvc;
    /** Fill this to use custom dataProvider */
    dataProvider: WorkflowBuilderProviderAbstract;
    eventId: string;
    debugMode: boolean;
    diagramConfig: Partial<Pick<Diagram, 'constraints' | 'snapSettings' | 'getConnectorDefaults' | 'height' | 'width' | 'drawingObject' | 'tooltip'>>;
    tool: DiagramTools;
    paletteConfig: Pick<SymbolPaletteComponent, 'palettes' | 'getSymbolInfo'>;
    isInitialized: boolean;
    zoomOptions: number[];
    currentZoomFactor: number;
    diagramEl: Diagram;
    nodeForms?: QueryList<WorkflowBuilderNodeFormComponent>;
    constructor(builderSvc: WorkflowBuilderService, controller: AzavistaWorkflowBuilderController, host: ElementRef<HTMLElement>, resize$: NgResizeObserver, sharedSvc: AzavistaSharedService);
    ngOnInit(): Promise<void>;
    ngAfterViewInit(): Promise<void>;
    onDiagramLoad(): Promise<void>;
    onPublish(): Promise<void>;
    log(logName: string, ...params: any[]): void;
    getSymbolInfo(symbol: any): {
        width: number;
        height: number;
        description: {
            text: any;
        };
    };
    onConnectionPointChange(event: ConnectionPointChangeEvent): void;
    onElementDraw(event: IElementDrawEventArgs): Promise<void>;
    onCollectionChange(event: ICollectionChangeEventArgs): Promise<void>;
    onSelectionChange(event: ISelectionChangeEventArgs): Promise<void>;
    onScrollChange(event: IScrollChangeEventArgs): void;
    deleteWorkflow(workflowId: string): void;
    /** Handle when dragging the tip end/start of a connector */
    onConnectionChange(event: IConnectionChangeEventArgs): Promise<void>;
    private onDropPalette;
    onPositionChange(event: IDraggingEventArgs): void;
    private onConnectionAddedByDrawing;
    private checkConnector;
    private handleConnectorPorts;
    updateWorkflowSettings(nodeId: string, data: IValueChangesWithObject): void;
    updateWorkflowCanvas(nodeId: string, data: Partial<Canvas>): void;
    deleteNode(nodeModel: NodeModel): void;
    private updateDiagramSize;
    saveState(): void;
    hasNodeSelectedAndExpanded: (selectedNodes: NodeModelSyncfusion[]) => boolean;
    hasNodeSelectedAndExpanded2(): boolean;
    areWorkflowsValid: (validityMap: AzavistaWorkflowBuilderController['validityMap']) => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderComponent, "azavista-workflow-builder", never, { "dataProvider": { "alias": "dataProvider"; "required": false; }; "eventId": { "alias": "eventId"; "required": false; }; "debugMode": { "alias": "debugMode"; "required": false; }; }, {}, never, never, false, never>;
}
