import { Component, HostListener } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PALETTE_CATEGORIES_MAP, PALETTE_CATEGORIES_ORDER, WORKFLOW_NAME_TRANSLATIONS, } from '../../types';
import { getNodeModelForPalette } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@azavista/components/shared";
import * as i2 from "../../services/workflow-builder.service";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/input";
import * as i5 from "@syncfusion/ej2-angular-diagrams";
import * as i6 from "@angular/common";
import * as i7 from "@ngx-translate/core";
import * as i8 from "../../pipes/apply-function.pipe";
export class WorkflowBuilderPaletteComponent {
    constructor(sharedSvc, ngZone, builderService) {
        this.sharedSvc = sharedSvc;
        this.ngZone = ngZone;
        this.builderService = builderService;
        this.palettes = [];
        this.paletteCategories = PALETTE_CATEGORIES_ORDER;
        this.expandMode = 'Multiple';
        this.paletteCategoryMap = PALETTE_CATEGORIES_MAP;
        this.trackByString = (index, data) => data;
        this.getPalettesFromPaletteCategories = async (searchText) => {
            await firstValueFrom(this.builderService.translationsLoaded());
            return PALETTE_CATEGORIES_ORDER.map((category) => this.getPaletteModelFromPaletteCategory(searchText, category));
        };
        /** `getSymbolInfo` should use arrow-function instead of method, because the method later is bind with syncfusion instead of current component  */
        this.getSymbolInfo = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        symbol) => {
            return {
                fit: true,
                width: 100,
                height: 80,
                tooltip: ' ',
                description: {
                    text: '',
                    wrap: 'Wrap',
                    overflow: 'Wrap',
                    margin: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                },
            };
        };
        this.getPaletteModelFromPaletteCategory = (searchText, category) => {
            const symbols = this.paletteCategoryMap[category]
                ?.filter((paletteSymbol) => this.isWorkflowNameContainsSearchText(searchText, paletteSymbol))
                ?.map((paletteSymbol) => getNodeModelForPalette(paletteSymbol, this.sharedSvc)) ?? [];
            const paletteModel = {
                id: category,
                title: `${this.sharedSvc.translate(category)} ${searchText ? `(${symbols?.length ?? 0})` : ''}`,
                expanded: true,
                symbols,
            };
            return paletteModel;
        };
        this.isWorkflowNameContainsSearchText = (searchText, paletteSymbol) => {
            return this.sharedSvc
                .translate(WORKFLOW_NAME_TRANSLATIONS[paletteSymbol])
                .toLowerCase()
                ?.includes(searchText.toLowerCase());
        };
        this.getPalettesFromPaletteCategories('').then((palettes) => {
            this.palettes = palettes;
        });
    }
    onHostClick(event) {
        const srcElement = event.srcElement;
        const paletteCategoryHeaderEl = this.getPaletteCategoryHeaderElementFromParent(srcElement);
        if (paletteCategoryHeaderEl) {
            const paletteCategoryContainerEl = this.getPaletteCategoryContainerElementFromParent(paletteCategoryHeaderEl);
            paletteCategoryContainerEl?.classList.toggle('e-acrdn-item--hide-content');
        }
    }
    getPaletteCategoryHeaderElementFromParent(element) {
        if (element.classList.contains('e-acrdn-header')) {
            return element;
        }
        if (this.isElementPaletteCategoryContainer(element) ||
            this.isElementHostContainer(element)) {
            return null;
        }
        return element.parentElement
            ? this.getPaletteCategoryHeaderElementFromParent(element.parentElement)
            : null;
    }
    getPaletteCategoryContainerElementFromParent(element) {
        if (this.isElementPaletteCategoryContainer(element)) {
            return element;
        }
        if (this.isElementHostContainer(element)) {
            return null;
        }
        return element.parentElement
            ? this.getPaletteCategoryContainerElementFromParent(element.parentElement)
            : null;
    }
    isElementHostContainer(element) {
        return (element.tagName ===
            'azavista-workflow-builder-workflow-builder-palette');
    }
    isElementPaletteCategoryContainer(element) {
        return element.classList.contains('e-acrdn-item');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderPaletteComponent, deps: [{ token: i1.AzavistaSharedService }, { token: i0.NgZone }, { token: i2.WorkflowBuilderService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderPaletteComponent, selector: "azavista-workflow-builder-workflow-builder-palette", host: { listeners: { "click": "onHostClick($event)" } }, ngImport: i0, template: "<mat-form-field>\n  <input #searchText matInput [placeholder]=\"'TYPE_TO_FILTER_BLOCKS' | translate\" />\n</mat-form-field>\n\n<ejs-symbolpalette\n  #symbolpalette\n  id=\"symbolpalette\"\n  [enableAnimation]=\"true\"\n  [expandMode]=\"expandMode\"\n  [palettes]=\"searchText.value| apply : getPalettesFromPaletteCategories | async\"\n  [getSymbolInfo]=\"getSymbolInfo\"\n>\n</ejs-symbolpalette>\n", styles: [":host{display:flex;flex-direction:column;position:relative;overflow:visible;font-size:12px;height:100%}:host ::ng-deep *{font-size:12px}.mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}mat-form-field{width:100%;padding:.5em 10px 1em;box-sizing:border-box}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper{background-color:#fff;border-radius:0!important}mat-form-field ::ng-deep .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:8px 0!important;min-height:auto}ejs-symbolpalette{display:block;position:relative;overflow:auto;margin-top:-4px}ejs-symbolpalette ::ng-deep .e-acrdn-header{display:flex;align-items:center;justify-content:space-between;background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6;border-radius:4px;padding:4px 10px;font-weight:500;color:#666;cursor:pointer}ejs-symbolpalette ::ng-deep .e-acrdn-content{min-height:2em}ejs-symbolpalette ::ng-deep .e-acrdn-content .e-symbol-draggable{cursor:grab}ejs-symbolpalette ::ng-deep .e-remove-palette{animation:.3s;overflow:hidden}ejs-symbolpalette ::ng-deep .e-toggle-icon{animation:.3s}ejs-symbolpalette ::ng-deep .e-tgl-collapse-icon.e-icons:before{font-family:Material Icons;content:\"\\e5c7\";font-size:2em;line-height:1em;animation:.3s}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-toggle-icon{transform:rotate(180deg)}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-remove-palette{height:0px;opacity:0}::ng-deep .e-symbol-draggable>canvas{background-color:#fff}::ng-deep .e-html-layer{border-radius:2px;box-shadow:0 0 2px #0000009c}::ng-deep .palette-item{box-sizing:border-box;display:flex;flex-direction:column;gap:4px;position:relative;width:100%;height:100%;padding:2px 4px;align-items:center;justify-content:space-evenly}::ng-deep .palette-item__inner{display:block;position:relative;width:40px;height:40px;border-radius:4px;align-items:center;box-sizing:border-box;color:transparent}::ng-deep .palette-item__title{font-size:10px;text-align:center;margin:0 auto}::ng-deep .palette-item__icon{color:#a6a6a6;font-size:40px;margin:auto;position:absolute}::ng-deep .palette-item__input,::ng-deep .palette-item__output,::ng-deep .palette-item__decline-input,::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-input,::ng-deep .palette-item__cancellation-output{display:block;border-radius:50%;background-color:#fff;border:1px solid #a6a6a6;height:4.9px;width:4.9px;position:absolute;top:50%;transform:translateY(-50%)}::ng-deep .palette-item__input{left:2px}::ng-deep .palette-item__output{border-color:#bbb;right:0}::ng-deep .palette-item__decline-input,::ng-deep .palette-item__cancellation-input{top:4px;left:50%;transform:translateY(-50%) translate(-40%)}::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-output{top:100%;left:50%;transform:translateY(-100%) translate(-50%)}::ng-deep #create-work-block_container{pointer-events:none;opacity:.5}mat-expansion-panel{border:none!important;background:transparent;box-shadow:none!important;margin:0}mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}.mat-expansion-panel-header{background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6}\n"], dependencies: [{ kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.SymbolPaletteComponent, selector: "ejs-symbolpalette", inputs: ["accessKey", "allowDrag", "connectorDefaults", "enableAnimation", "enablePersistence", "enableRtl", "enableSearch", "expandMode", "filterSymbols", "getConnectorDefaults", "getNodeDefaults", "getSymbolInfo", "getSymbolTemplate", "height", "ignoreSymbolsOnSearch", "locale", "nodeDefaults", "palettes", "symbolDragSize", "symbolHeight", "symbolInfo", "symbolMargin", "symbolPreview", "symbolWidth", "width"], outputs: ["paletteExpanding", "paletteSelectionChange"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "translate" }, { kind: "pipe", type: i8.ApplyFunctionPipe, name: "apply" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-workflow-builder-palette', template: "<mat-form-field>\n  <input #searchText matInput [placeholder]=\"'TYPE_TO_FILTER_BLOCKS' | translate\" />\n</mat-form-field>\n\n<ejs-symbolpalette\n  #symbolpalette\n  id=\"symbolpalette\"\n  [enableAnimation]=\"true\"\n  [expandMode]=\"expandMode\"\n  [palettes]=\"searchText.value| apply : getPalettesFromPaletteCategories | async\"\n  [getSymbolInfo]=\"getSymbolInfo\"\n>\n</ejs-symbolpalette>\n", styles: [":host{display:flex;flex-direction:column;position:relative;overflow:visible;font-size:12px;height:100%}:host ::ng-deep *{font-size:12px}.mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}mat-form-field{width:100%;padding:.5em 10px 1em;box-sizing:border-box}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper{background-color:#fff;border-radius:0!important}mat-form-field ::ng-deep .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:8px 0!important;min-height:auto}ejs-symbolpalette{display:block;position:relative;overflow:auto;margin-top:-4px}ejs-symbolpalette ::ng-deep .e-acrdn-header{display:flex;align-items:center;justify-content:space-between;background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6;border-radius:4px;padding:4px 10px;font-weight:500;color:#666;cursor:pointer}ejs-symbolpalette ::ng-deep .e-acrdn-content{min-height:2em}ejs-symbolpalette ::ng-deep .e-acrdn-content .e-symbol-draggable{cursor:grab}ejs-symbolpalette ::ng-deep .e-remove-palette{animation:.3s;overflow:hidden}ejs-symbolpalette ::ng-deep .e-toggle-icon{animation:.3s}ejs-symbolpalette ::ng-deep .e-tgl-collapse-icon.e-icons:before{font-family:Material Icons;content:\"\\e5c7\";font-size:2em;line-height:1em;animation:.3s}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-toggle-icon{transform:rotate(180deg)}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-remove-palette{height:0px;opacity:0}::ng-deep .e-symbol-draggable>canvas{background-color:#fff}::ng-deep .e-html-layer{border-radius:2px;box-shadow:0 0 2px #0000009c}::ng-deep .palette-item{box-sizing:border-box;display:flex;flex-direction:column;gap:4px;position:relative;width:100%;height:100%;padding:2px 4px;align-items:center;justify-content:space-evenly}::ng-deep .palette-item__inner{display:block;position:relative;width:40px;height:40px;border-radius:4px;align-items:center;box-sizing:border-box;color:transparent}::ng-deep .palette-item__title{font-size:10px;text-align:center;margin:0 auto}::ng-deep .palette-item__icon{color:#a6a6a6;font-size:40px;margin:auto;position:absolute}::ng-deep .palette-item__input,::ng-deep .palette-item__output,::ng-deep .palette-item__decline-input,::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-input,::ng-deep .palette-item__cancellation-output{display:block;border-radius:50%;background-color:#fff;border:1px solid #a6a6a6;height:4.9px;width:4.9px;position:absolute;top:50%;transform:translateY(-50%)}::ng-deep .palette-item__input{left:2px}::ng-deep .palette-item__output{border-color:#bbb;right:0}::ng-deep .palette-item__decline-input,::ng-deep .palette-item__cancellation-input{top:4px;left:50%;transform:translateY(-50%) translate(-40%)}::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-output{top:100%;left:50%;transform:translateY(-100%) translate(-50%)}::ng-deep #create-work-block_container{pointer-events:none;opacity:.5}mat-expansion-panel{border:none!important;background:transparent;box-shadow:none!important;margin:0}mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}.mat-expansion-panel-header{background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AzavistaSharedService }, { type: i0.NgZone }, { type: i2.WorkflowBuilderService }]; }, propDecorators: { onHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYnVpbGRlci1wYWxldHRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F6YXZpc3RhL3dvcmtmbG93LWJ1aWxkZXIvc3JjL2xpYi9jb21wb25lbnRzL3dvcmtmbG93LWJ1aWxkZXItcGFsZXR0ZS93b3JrZmxvdy1idWlsZGVyLXBhbGV0dGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXphdmlzdGEvd29ya2Zsb3ctYnVpbGRlci9zcmMvbGliL2NvbXBvbmVudHMvd29ya2Zsb3ctYnVpbGRlci1wYWxldHRlL3dvcmtmbG93LWJ1aWxkZXItcGFsZXR0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUloRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFDSCxzQkFBc0IsRUFDdEIsd0JBQXdCLEVBR3hCLDBCQUEwQixHQUM3QixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7Ozs7QUFPckQsTUFBTSxPQUFPLCtCQUErQjtJQVd4QyxZQUNXLFNBQWdDLEVBQy9CLE1BQWMsRUFDZCxjQUFzQztRQUZ2QyxjQUFTLEdBQVQsU0FBUyxDQUF1QjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQXdCO1FBYmxELGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBRTlCLHNCQUFpQixHQUFHLHdCQUF3QixDQUFDO1FBRTdDLGVBQVUsR0FBZSxVQUFVLENBQUM7UUFFcEMsdUJBQWtCLEdBQUcsc0JBQXNCLENBQUM7UUFFNUMsa0JBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVB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K0JBQStCO2tCQUwzQyxTQUFTOytCQUNJLG9EQUFvRDtzS0EwQjlELFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWxldHRlTW9kZWwsIFN5bWJvbEluZm8gfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kaWFncmFtcyc7XG5pbXBvcnQgeyBBemF2aXN0YVNoYXJlZFNlcnZpY2UgfSBmcm9tICdAYXphdmlzdGEvY29tcG9uZW50cy9zaGFyZWQnO1xuaW1wb3J0IHsgRXhwYW5kTW9kZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1uYXZpZ2F0aW9ucyc7XG5pbXBvcnQgeyBmaXJzdFZhbHVlRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBQQUxFVFRFX0NBVEVHT1JJRVNfTUFQLFxuICAgIFBBTEVUVEVfQ0FURUdPUklFU19PUkRFUixcbiAgICBQYWxldHRlQ2F0ZWdvcnksXG4gICAgUGFsZXR0ZVN5bWJvbCxcbiAgICBXT1JLRkxPV19OQU1FX1RSQU5TTEFUSU9OUyxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgV29ya2Zsb3dCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3dvcmtmbG93LWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBnZXROb2RlTW9kZWxGb3JQYWxldHRlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F6YXZpc3RhLXdvcmtmbG93LWJ1aWxkZXItd29ya2Zsb3ctYnVpbGRlci1wYWxldHRlJyxcbiAgICB0ZW1wbGF0ZVVybDogYC4vd29ya2Zsb3ctYnVpbGRlci1wYWxldHRlLmNvbXBvbmVudC5odG1sYCxcbiAgICBzdHlsZVVybHM6IFsnLi93b3JrZmxvdy1idWlsZGVyLXBhbGV0dGUuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgV29ya2Zsb3dCdWlsZGVyUGFsZXR0ZUNvbXBvbmVudCB7XG4gICAgcGFsZXR0ZXM6IFBhbGV0dGVNb2RlbFtdID0gW107XG5cbiAgICBwYWxldHRlQ2F0ZWdvcmllcyA9IFBBTEVUVEVfQ0FURUdPUklFU19PUkRFUjtcblxuICAgIGV4cGFuZE1vZGU6IEV4cGFuZE1vZGUgPSAnTXVsdGlwbGUnO1xuXG4gICAgcGFsZXR0ZUNhdGVnb3J5TWFwID0gUEFMRVRURV9DQVRFR09SSUVTX01BUDtcblxuICAgIHRyYWNrQnlTdHJpbmcgPSAoaW5kZXg6IG51bWJlciwgZGF0YTogc3RyaW5nKSA9PiBkYXRhO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBzaGFyZWRTdmM6IEF6YXZpc3RhU2hhcmVkU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBidWlsZGVyU2VydmljZTogV29ya2Zsb3dCdWlsZGVyU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5nZXRQYWxldHRlc0Zyb21QYWxldHRlQ2F0ZWdvcmllcygnJykudGhlbigocGFsZXR0ZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFsZXR0ZXMgPSBwYWxldHRlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uSG9zdENsaWNrKGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc3JjRWxlbWVudCA9IGV2ZW50LnNyY0VsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHBhbGV0dGVDYXRlZ29yeUhlYWRlckVsID1cbiAgICAgICAgICAgIHRoaXMuZ2V0UGFsZXR0ZUNhdGVnb3J5SGVhZGVyRWxlbWVudEZyb21QYXJlbnQoc3JjRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHBhbGV0dGVDYXRlZ29yeUhlYWRlckVsKSB7XG4gICAgICAgICAgICBjb25zdCBwYWxldHRlQ2F0ZWdvcnlDb250YWluZXJFbCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYWxldHRlQ2F0ZWdvcnlDb250YWluZXJFbGVtZW50RnJvbVBhcmVudChcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZUNhdGVnb3J5SGVhZGVyRWwsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhbGV0dGVDYXRlZ29yeUNvbnRhaW5lckVsPy5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICAgICAgICAgICdlLWFjcmRuLWl0ZW0tLWhpZGUtY29udGVudCcsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFsZXR0ZXNGcm9tUGFsZXR0ZUNhdGVnb3JpZXMgPSBhc3luYyAoXG4gICAgICAgIHNlYXJjaFRleHQ6IHN0cmluZyxcbiAgICApOiBQcm9taXNlPFBhbGV0dGVNb2RlbFtdPiA9PiB7XG4gICAgICAgIGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuYnVpbGRlclNlcnZpY2UudHJhbnNsYXRpb25zTG9hZGVkKCkpO1xuXG4gICAgICAgIHJldHVybiBQQUxFVFRFX0NBVEVHT1JJRVNfT1JERVIubWFwKChjYXRlZ29yeSkgPT5cbiAgICAgICAgICAgIHRoaXMuZ2V0UGFsZXR0ZU1vZGVsRnJvbVBhbGV0dGVDYXRlZ29yeShzZWFyY2hUZXh0LCBjYXRlZ29yeSksXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKiBgZ2V0U3ltYm9sSW5mb2Agc2hvdWxkIHVzZSBhcnJvdy1mdW5jdGlvbiBpbnN0ZWFkIG9mIG1ldGhvZCwgYmVjYXVzZSB0aGUgbWV0aG9kIGxhdGVyIGlzIGJpbmQgd2l0aCBzeW5jZnVzaW9uIGluc3RlYWQgb2YgY3VycmVudCBjb21wb25lbnQgICovXG4gICAgZ2V0U3ltYm9sSW5mbyA9IChcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBzeW1ib2w6IE5vZGVNb2RlbEZvclBhbGV0dGU8UGFsZXR0ZVN5bWJvbD4sXG4gICAgKTogU3ltYm9sSW5mbyA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaXQ6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MCxcbiAgICAgICAgICAgIHRvb2x0aXA6ICcgJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgd3JhcDogJ1dyYXAnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnV3JhcCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZ2V0UGFsZXR0ZU1vZGVsRnJvbVBhbGV0dGVDYXRlZ29yeSA9IChcbiAgICAgICAgc2VhcmNoVGV4dDogc3RyaW5nLFxuICAgICAgICBjYXRlZ29yeTogUGFsZXR0ZUNhdGVnb3J5LFxuICAgICk6IFBhbGV0dGVNb2RlbCA9PiB7XG4gICAgICAgIGNvbnN0IHN5bWJvbHMgPVxuICAgICAgICAgICAgdGhpcy5wYWxldHRlQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldXG4gICAgICAgICAgICAgICAgPy5maWx0ZXIoKHBhbGV0dGVTeW1ib2wpID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNXb3JrZmxvd05hbWVDb250YWluc1NlYXJjaFRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZVN5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgPy5tYXAoKHBhbGV0dGVTeW1ib2wpID0+XG4gICAgICAgICAgICAgICAgICAgIGdldE5vZGVNb2RlbEZvclBhbGV0dGUocGFsZXR0ZVN5bWJvbCwgdGhpcy5zaGFyZWRTdmMpLFxuICAgICAgICAgICAgICAgICkgPz8gW107XG4gICAgICAgIGNvbnN0IHBhbGV0dGVNb2RlbCA9IHtcbiAgICAgICAgICAgIGlkOiBjYXRlZ29yeSxcbiAgICAgICAgICAgIHRpdGxlOiBgJHt0aGlzLnNoYXJlZFN2Yy50cmFuc2xhdGUoY2F0ZWdvcnkpfSAke1xuICAgICAgICAgICAgICAgIHNlYXJjaFRleHQgPyBgKCR7c3ltYm9scz8ubGVuZ3RoID8/IDB9KWAgOiAnJ1xuICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICBleHBhbmRlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN5bWJvbHMsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwYWxldHRlTW9kZWw7XG4gICAgfTtcblxuICAgIGlzV29ya2Zsb3dOYW1lQ29udGFpbnNTZWFyY2hUZXh0ID0gKFxuICAgICAgICBzZWFyY2hUZXh0OiBzdHJpbmcsXG4gICAgICAgIHBhbGV0dGVTeW1ib2w6IFBhbGV0dGVTeW1ib2wsXG4gICAgKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFN2Y1xuICAgICAgICAgICAgLnRyYW5zbGF0ZShXT1JLRkxPV19OQU1FX1RSQU5TTEFUSU9OU1twYWxldHRlU3ltYm9sXSlcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICA/LmluY2x1ZGVzKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcblxuICAgIGdldFBhbGV0dGVDYXRlZ29yeUhlYWRlckVsZW1lbnRGcm9tUGFyZW50KFxuICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICApOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2UtYWNyZG4taGVhZGVyJykpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuaXNFbGVtZW50UGFsZXR0ZUNhdGVnb3J5Q29udGFpbmVyKGVsZW1lbnQpIHx8XG4gICAgICAgICAgICB0aGlzLmlzRWxlbWVudEhvc3RDb250YWluZXIoZWxlbWVudClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICA/IHRoaXMuZ2V0UGFsZXR0ZUNhdGVnb3J5SGVhZGVyRWxlbWVudEZyb21QYXJlbnQoXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRQYWxldHRlQ2F0ZWdvcnlDb250YWluZXJFbGVtZW50RnJvbVBhcmVudChcbiAgICAgICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbGVtZW50UGFsZXR0ZUNhdGVnb3J5Q29udGFpbmVyKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnRIb3N0Q29udGFpbmVyKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICA/IHRoaXMuZ2V0UGFsZXR0ZUNhdGVnb3J5Q29udGFpbmVyRWxlbWVudEZyb21QYXJlbnQoXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRWxlbWVudEhvc3RDb250YWluZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGVsZW1lbnQudGFnTmFtZSA9PT1cbiAgICAgICAgICAgICdhemF2aXN0YS13b3JrZmxvdy1idWlsZGVyLXdvcmtmbG93LWJ1aWxkZXItcGFsZXR0ZSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRWxlbWVudFBhbGV0dGVDYXRlZ29yeUNvbnRhaW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2UtYWNyZG4taXRlbScpO1xuICAgIH1cbn1cbiIsIjxtYXQtZm9ybS1maWVsZD5cbiAgPGlucHV0ICNzZWFyY2hUZXh0IG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCInVFlQRV9UT19GSUxURVJfQkxPQ0tTJyB8IHRyYW5zbGF0ZVwiIC8+XG48L21hdC1mb3JtLWZpZWxkPlxuXG48ZWpzLXN5bWJvbHBhbGV0dGVcbiAgI3N5bWJvbHBhbGV0dGVcbiAgaWQ9XCJzeW1ib2xwYWxldHRlXCJcbiAgW2VuYWJsZUFuaW1hdGlvbl09XCJ0cnVlXCJcbiAgW2V4cGFuZE1vZGVdPVwiZXhwYW5kTW9kZVwiXG4gIFtwYWxldHRlc109XCJzZWFyY2hUZXh0LnZhbHVlfCBhcHBseSA6IGdldFBhbGV0dGVzRnJvbVBhbGV0dGVDYXRlZ29yaWVzIHwgYXN5bmNcIlxuICBbZ2V0U3ltYm9sSW5mb109XCJnZXRTeW1ib2xJbmZvXCJcbj5cbjwvZWpzLXN5bWJvbHBhbGV0dGU+XG4iXX0=