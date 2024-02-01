import { NgModule } from '@angular/core';
import { DiagramModule, SymbolPaletteModule, } from '@syncfusion/ej2-angular-diagrams';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AzavistaServicelibModule } from '@azavista/servicelib';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AzavistaButtonModule } from '@azavista/components/button';
import { AzavistaFlowBuilderModule } from '@azavista/components/flow-builder';
import { WorkflowBuilderComponent } from './workflow-builder.component';
import { WorkflowBuilderPaletteComponent } from './components/workflow-builder-palette/workflow-builder-palette.component';
import { WorkflowBuilderNodeFormComponent } from './components/workflow-builder-node-form/workflow-builder-node-form.component';
import { WorkflowBuilderProcessBuilderComponent } from './components/workflow-builder-process-builder/workflow-builder-process-builder.component';
import { WorkflowBuilderNodeFormHeaderComponent } from './components/workflow-builder-node-form-header/workflow-builder-node-form-header.component';
import { WorkflowBuilderNodeFormFieldTextComponent } from './components/workflow-builder-node-form-field-text/workflow-builder-node-form-field-text.component';
import { WorkflowBuilderNodeFormFieldSelectComponent } from './components/workflow-builder-node-form-field-select/workflow-builder-node-form-field-select.component';
import { ApplyFunctionPipe } from './pipes/apply-function.pipe';
import { WorkflowBuilderNodeFormFieldToggleComponent } from './components/workflow-builder-node-form-field-toggle/workflow-builder-node-form-field-toggle.component';
import { WorkflowBuilderNodeFormFieldProcessComponent } from './components/workflow-builder-node-form-field-process/workflow-builder-node-form-field-process.component';
import { WorkflowBuilderProcessBuilderDialogComponent } from './components/workflow-builder-process-builder-dialog/workflow-builder-process-builder-dialog.component';
import * as i0 from "@angular/core";
export class AzavistaWorkflowBuilderModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderModule, declarations: [WorkflowBuilderComponent,
            WorkflowBuilderPaletteComponent,
            WorkflowBuilderNodeFormComponent,
            WorkflowBuilderNodeFormHeaderComponent,
            WorkflowBuilderNodeFormFieldTextComponent,
            WorkflowBuilderNodeFormFieldSelectComponent,
            WorkflowBuilderNodeFormFieldToggleComponent,
            WorkflowBuilderNodeFormFieldProcessComponent,
            WorkflowBuilderProcessBuilderComponent,
            WorkflowBuilderProcessBuilderDialogComponent,
            ApplyFunctionPipe], imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatExpansionModule,
            MatSelectModule,
            MatCheckboxModule,
            MatListModule,
            MatSlideToggleModule,
            MatTabsModule,
            MatDialogModule,
            TranslateModule,
            DiagramModule,
            SymbolPaletteModule,
            // AzavistaGroupedFieldsModule,
            AzavistaServicelibModule,
            // AzavistaInputFieldModule,
            AzavistaButtonModule,
            AzavistaFlowBuilderModule], exports: [WorkflowBuilderComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderModule, imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatExpansionModule,
            MatSelectModule,
            MatCheckboxModule,
            MatListModule,
            MatSlideToggleModule,
            MatTabsModule,
            MatDialogModule,
            TranslateModule,
            DiagramModule,
            SymbolPaletteModule,
            // AzavistaGroupedFieldsModule,
            AzavistaServicelibModule,
            // AzavistaInputFieldModule,
            AzavistaButtonModule,
            AzavistaFlowBuilderModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        WorkflowBuilderComponent,
                        WorkflowBuilderPaletteComponent,
                        WorkflowBuilderNodeFormComponent,
                        WorkflowBuilderNodeFormHeaderComponent,
                        WorkflowBuilderNodeFormFieldTextComponent,
                        WorkflowBuilderNodeFormFieldSelectComponent,
                        WorkflowBuilderNodeFormFieldToggleComponent,
                        WorkflowBuilderNodeFormFieldProcessComponent,
                        WorkflowBuilderProcessBuilderComponent,
                        WorkflowBuilderProcessBuilderDialogComponent,
                        ApplyFunctionPipe,
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        MatIconModule,
                        MatExpansionModule,
                        MatSelectModule,
                        MatCheckboxModule,
                        MatListModule,
                        MatSlideToggleModule,
                        MatTabsModule,
                        MatDialogModule,
                        TranslateModule,
                        DiagramModule,
                        SymbolPaletteModule,
                        // AzavistaGroupedFieldsModule,
                        AzavistaServicelibModule,
                        // AzavistaInputFieldModule,
                        AzavistaButtonModule,
                        AzavistaFlowBuilderModule,
                    ],
                    exports: [WorkflowBuilderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hemF2aXN0YS93b3JrZmxvdy1idWlsZGVyL3NyYy9saWIvd29ya2Zsb3ctYnVpbGRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixHQUN0QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFx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RW5CLCtCQUErQjt3QkFDL0Isd0JBQXdCO3dCQUN4Qiw0QkFBNEI7d0JBQzVCLG9CQUFvQjt3QkFDcEIseUJBQXlCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEaWFncmFtTW9kdWxlLFxuICAgIFN5bWJvbFBhbGV0dGVNb2R1bGUsXG59IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRpYWdyYW1zJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgQXphdmlzdGFTZXJ2aWNlbGliTW9kdWxlIH0gZnJvbSAnQGF6YXZpc3RhL3NlcnZpY2VsaWInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXphdmlzdGFCdXR0b25Nb2R1bGUgfSBmcm9tICdAYXphdmlzdGEvY29tcG9uZW50cy9idXR0b24nO1xuaW1wb3J0IHsgQXphdmlzdGFGbG93QnVpbGRlck1vZHVsZSB9IGZyb20gJ0BhemF2aXN0YS9jb21wb25lbnRzL2Zsb3ctYnVpbGRlcic7XG5pbXBvcnQgeyBXb3JrZmxvd0J1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3dvcmtmbG93LWJ1aWxkZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgV29ya2Zsb3dCdWlsZGVyUGFsZXR0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93b3JrZmxvdy1idWlsZGVyLXBhbGV0dGUvd29ya2Zsb3ctYnVpbGRlci1wYWxldHRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3JrZmxvd0J1aWxkZXJOb2RlRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93b3JrZmxvdy1idWlsZGVyLW5vZGUtZm9ybS93b3JrZmxvdy1idWlsZGVyLW5vZGUtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya2Zsb3dCdWlsZGVyUHJvY2Vzc0J1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtmbG93QnVpbGRlck5vZGVGb3JtSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dvcmtmbG93LWJ1aWxkZXItbm9kZS1mb3JtLWhlYWRlci93b3JrZmxvdy1idWlsZGVyLW5vZGUtZm9ybS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtmbG93QnVpbGRlck5vZGVGb3JtRmllbGRUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dvcmtmbG93LWJ1aWxkZXItbm9kZS1mb3JtLWZpZWxkLXRleHQvd29ya2Zsb3ctYnVpbGRlci1ub2RlLWZvcm0tZmllbGQtdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya2Zsb3dCdWlsZGVyTm9kZUZvcm1GaWVsZFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93b3JrZmxvdy1idWlsZGVyLW5vZGUtZm9ybS1maWVsZC1zZWxlY3Qvd29ya2Zsb3ctYnVpbGRlci1ub2RlLWZvcm0tZmllbGQtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBseUZ1bmN0aW9uUGlwZSB9IGZyb20gJy4vcGlwZXMvYXBwbHktZnVuY3Rpb24ucGlwZSc7XG5pbXBvcnQgeyBXb3JrZmxvd0J1aWxkZXJOb2RlRm9ybUZpZWxkVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dvcmtmbG93LWJ1aWxkZXItbm9kZS1mb3JtLWZpZWxkLXRvZ2dsZS93b3JrZmxvdy1idWlsZGVyLW5vZGUtZm9ybS1maWVsZC10b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtmbG93QnVpbGRlck5vZGVGb3JtRmllbGRQcm9jZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dvcmtmbG93LWJ1aWxkZXItbm9kZS1mb3JtLWZpZWxkLXByb2Nlc3Mvd29ya2Zsb3ctYnVpbGRlci1ub2RlLWZvcm0tZmllbGQtcHJvY2Vzcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya2Zsb3dCdWlsZGVyUHJvY2Vzc0J1aWxkZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXItZGlhbG9nL3dvcmtmbG93LWJ1aWxkZXItcHJvY2Vzcy1idWlsZGVyLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBXb3JrZmxvd0J1aWxkZXJDb21wb25lbnQsXG4gICAgICAgIFdvcmtmbG93QnVpbGRlclBhbGV0dGVDb21wb25lbnQsXG4gICAgICAgIFdvcmtmbG93QnVpbGRlck5vZGVGb3JtQ29tcG9uZW50LFxuICAgICAgICBXb3JrZmxvd0J1aWxkZXJOb2RlRm9ybUhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgV29ya2Zsb3dCdWlsZGVyTm9kZUZvcm1GaWVsZFRleHRDb21wb25lbnQsXG4gICAgICAgIFdvcmtmbG93QnVpbGRlck5vZGVGb3JtRmllbGRTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIFdvcmtmbG93QnVpbGRlck5vZGVGb3JtRmllbGRUb2dnbGVDb21wb25lbnQsXG4gICAgICAgIFdvcmtmbG93QnVpbGRlck5vZGVGb3JtRmllbGRQcm9jZXNzQ29tcG9uZW50LFxuICAgICAgICBXb3JrZmxvd0J1aWxkZXJQcm9jZXNzQnVpbGRlckNvbXBvbmVudCxcbiAgICAgICAgV29ya2Zsb3dCdWlsZGVyUHJvY2Vzc0J1aWxkZXJEaWFsb2dDb21wb25lbnQsXG5cbiAgICAgICAgQXBwbHlGdW5jdGlvblBpcGUsXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxuICAgICAgICBNYXREaWFsb2dNb2R1bGUsXG5cbiAgICAgICAgVHJhbnNsYXRlTW9kdWxlLFxuXG4gICAgICAgIERpYWdyYW1Nb2R1bGUsXG4gICAgICAgIFN5bWJvbFBhbGV0dGVNb2R1bGUsXG5cbiAgICAgICAgLy8gQXphdmlzdGFHcm91cGVkRmllbGRzTW9kdWxlLFxuICAgICAgICBBemF2aXN0YVNlcnZpY2VsaWJNb2R1bGUsXG4gICAgICAgIC8vIEF6YXZpc3RhSW5wdXRGaWVsZE1vZHVsZSxcbiAgICAgICAgQXphdmlzdGFCdXR0b25Nb2R1bGUsXG4gICAgICAgIEF6YXZpc3RhRmxvd0J1aWxkZXJNb2R1bGUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbV29ya2Zsb3dCdWlsZGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQXphdmlzdGFXb3JrZmxvd0J1aWxkZXJNb2R1bGUge31cbiJdfQ==