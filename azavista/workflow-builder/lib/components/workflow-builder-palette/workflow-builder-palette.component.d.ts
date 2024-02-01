import { NgZone } from '@angular/core';
import { PaletteModel, SymbolInfo } from '@syncfusion/ej2-angular-diagrams';
import { AzavistaSharedService } from '@azavista/components/shared';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { PaletteCategory, PaletteSymbol } from '../../types';
import { WorkflowBuilderService } from '../../services/workflow-builder.service';
import * as i0 from "@angular/core";
export declare class WorkflowBuilderPaletteComponent {
    sharedSvc: AzavistaSharedService;
    private ngZone;
    private builderService;
    palettes: PaletteModel[];
    paletteCategories: readonly ["INVITATION_WORKFLOWS", "REGISTRATION_WORKFLOWS", "WAITING_LIST_WORKFLOWS", "CANCELLATION_WORKFLOWS", "PAYMENT_WORKFLOWS", "OTHER_WORKFLOWS"];
    expandMode: ExpandMode;
    paletteCategoryMap: Partial<Record<"INVITATION_WORKFLOWS" | "REGISTRATION_WORKFLOWS" | "WAITING_LIST_WORKFLOWS" | "CANCELLATION_WORKFLOWS" | "PAYMENT_WORKFLOWS" | "OTHER_WORKFLOWS", PaletteSymbol[]>>;
    trackByString: (index: number, data: string) => string;
    constructor(sharedSvc: AzavistaSharedService, ngZone: NgZone, builderService: WorkflowBuilderService);
    onHostClick(event: PointerEvent): void;
    getPalettesFromPaletteCategories: (searchText: string) => Promise<PaletteModel[]>;
    /** `getSymbolInfo` should use arrow-function instead of method, because the method later is bind with syncfusion instead of current component  */
    getSymbolInfo: (symbol: NodeModelForPalette<PaletteSymbol>) => SymbolInfo;
    getPaletteModelFromPaletteCategory: (searchText: string, category: PaletteCategory) => PaletteModel;
    isWorkflowNameContainsSearchText: (searchText: string, paletteSymbol: PaletteSymbol) => boolean;
    getPaletteCategoryHeaderElementFromParent(element: HTMLElement): HTMLElement | null;
    getPaletteCategoryContainerElementFromParent(element: HTMLElement): HTMLElement | null;
    private isElementHostContainer;
    private isElementPaletteCategoryContainer;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowBuilderPaletteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowBuilderPaletteComponent, "azavista-workflow-builder-workflow-builder-palette", never, {}, {}, never, never, false, never>;
}
