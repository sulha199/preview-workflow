import { MatDialogRef } from '@angular/material/dialog';
import { Step } from '@azavista/servicelib';
import { WorkflowBuilderProcessBuilderComponent } from '../workflow-builder-process-builder/workflow-builder-process-builder.component';
import * as i0 from "@angular/core";
export type WorkflowBuilderProcessBuilderDialogData = Pick<WorkflowBuilderProcessBuilderComponent, 'eventId' | 'getAclObjectForCurrentUser' | 'fullProcess' | 'showOnlyFlowBuilder' | 'processType'>;
export declare class WorkflowBuilderProcessBuilderDialogComponent {
    data: WorkflowBuilderProcessBuilderDialogData;
    private dialogRef;
    constructor(data: WorkflowBuilderProcessBuilderDialogData, dialogRef: MatDialogRef<WorkflowBuilderProcessBuilderDialogData, Step[]>);
    onStepsSaved(steps: Step[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderProcessBuilderDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderProcessBuilderDialogComponent, "azavista-workflow-builder-process-builder-dialog", never, {}, {}, never, never, false, never>;
}
