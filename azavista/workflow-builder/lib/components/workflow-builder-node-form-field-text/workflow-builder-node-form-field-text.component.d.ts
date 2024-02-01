import { FormControl } from '@angular/forms';
import { WorkflowProperty } from '@azavista/workflow-builder-shared';
import * as i0 from "@angular/core";
export declare class WorkflowBuilderNodeFormFieldBaseComponent<T> {
    property?: WorkflowProperty;
    control?: FormControl<T>;
    workflowId?: string;
    eventId?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderNodeFormFieldBaseComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderNodeFormFieldBaseComponent<any>, "ng-component", never, { "property": { "alias": "property"; "required": false; }; "control": { "alias": "control"; "required": false; }; "workflowId": { "alias": "workflowId"; "required": false; }; "eventId": { "alias": "eventId"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class WorkflowBuilderNodeFormFieldTextComponent<T> extends WorkflowBuilderNodeFormFieldBaseComponent<T> {
    property?: WorkflowProperty & {
        type: 'text' | 'number';
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderNodeFormFieldTextComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderNodeFormFieldTextComponent<any>, "azavista-workflow-builder-node-form-field-text", never, { "property": { "alias": "property"; "required": false; }; }, {}, never, never, false, never>;
}
