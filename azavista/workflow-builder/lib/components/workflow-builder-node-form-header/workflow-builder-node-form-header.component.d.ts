import { EventEmitter, OnInit } from '@angular/core';
import { Canvas, WorkflowType } from '@azavista/workflow-builder-shared';
import { FormGroup } from '@angular/forms';
import { AzavistaSharedService } from '@azavista/components/shared';
import { CanvasControllerData, FormGroupType } from '../../types';
import * as i0 from "@angular/core";
type HeaderFormGroupData = Pick<Canvas, 'name' | 'description'>;
type HeaderFormGroup = FormGroup<FormGroupType<HeaderFormGroupData>>;
export declare class WorkflowBuilderNodeFormHeaderComponent<T extends WorkflowType = WorkflowType> implements OnInit {
    private sharedSvc;
    editMode: boolean;
    controllerData?: CanvasControllerData<T>;
    canvasChanges: EventEmitter<Partial<HeaderFormGroupData>>;
    formGroup?: HeaderFormGroup;
    constructor(sharedSvc: AzavistaSharedService);
    ngOnInit(): void;
    createFormGroup(controllerData: CanvasControllerData<T>): HeaderFormGroup;
    toggleEditMode(forceValue?: boolean): void;
    getWorkflowName: (formValueName: string | null | undefined) => string;
    getWorkflowDescription: (formValueDescription: string | null | undefined) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderNodeFormHeaderComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderNodeFormHeaderComponent<any>, "azavista-workflow-builder-node-form-header", never, { "editMode": { "alias": "editMode"; "required": false; }; "controllerData": { "alias": "controllerData"; "required": false; }; }, { "canvasChanges": "canvasChanges"; }, never, never, false, never>;
}
export {};
