import { MatDialog } from '@angular/material/dialog';
import { Step } from '@azavista/servicelib';
import { WorkflowProperty } from '@azavista/workflow-builder-shared';
import { WorkflowBuilderNodeFormFieldBaseComponent } from '../workflow-builder-node-form-field-text/workflow-builder-node-form-field-text.component';
import { AzavistaWorkflowBuilderController } from '../../workflow-builder.controller';
import * as i0 from "@angular/core";
export declare class WorkflowBuilderNodeFormFieldProcessComponent extends WorkflowBuilderNodeFormFieldBaseComponent<Step[]> {
    private dialog;
    private controller;
    property?: WorkflowProperty & {
        type: 'process';
    };
    constructor(dialog: MatDialog, controller: AzavistaWorkflowBuilderController);
    openSteps(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderNodeFormFieldProcessComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderNodeFormFieldProcessComponent, "azavista-workflow-builder-node-form-field-process", never, { "property": { "alias": "property"; "required": false; }; }, {}, never, never, false, never>;
}
