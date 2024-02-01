import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { WorkflowBuilderProviderApi } from './workflow-builder-provider.api';
import * as i0 from "@angular/core";
import * as i1 from "@azavista/servicelib";
import * as i2 from "../workflow-builder.controller";
import * as i3 from "@ngx-translate/core";
export class WorkflowBuilderService {
    constructor(apiSvc, controller, translate) {
        this.apiSvc = apiSvc;
        this.controller = controller;
        this.translate = translate;
        this.dataProvider = new WorkflowBuilderProviderApi(this.apiSvc, this.controller);
    }
    translationsLoaded() {
        if (this.translate.store.translations[this.translate.currentLang]) {
            return of(true);
        }
        return this.translate.onLangChange.pipe(map((res) => !!res));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, deps: [{ token: i1.AzavistaApiService }, { token: i2.AzavistaWorkflowBuilderController }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AzavistaApiService }, { type: i2.AzavistaWorkflowBuilderController }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXphdmlzdGEvd29ya2Zsb3ctYnVpbGRlci9zcmMvbGliL3NlcnZpY2VzL3dvcmtmbG93LWJ1aWxkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7OztBQVM3RSxNQUFNLE9BQU8sc0JBQXNCO0lBSS9CLFlBQ1ksTUFBMEIsRUFDMUIsVUFBNkMsRUFDN0MsU0FBMkI7UUFGM0IsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBbUM7UUFDN0MsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFOdkMsaUJBQVksR0FDUixJQUFJLDBCQUEwQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBTTlELENBQUM7SUFFSixrQkFBa0I7UUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9ELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOytHQWZRLHNCQUFzQjttSEFBdEIsc0JBQXNCLGNBRm5CLE1BQU07OzRGQUVULHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBemF2aXN0YUFwaVNlcnZpY2UgfSBmcm9tICdAYXphdmlzdGEvc2VydmljZWxpYic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgbWFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBXb3JrZmxvd0J1aWxkZXJQcm92aWRlckFwaSB9IGZyb20gJy4vd29ya2Zsb3ctYnVpbGRlci1wcm92aWRlci5hcGknO1xuaW1wb3J0IHtcbiAgICBBemF2aXN0YVdvcmtmbG93QnVpbGRlckNvbnRyb2xsZXIsXG4gICAgV29ya2Zsb3dCdWlsZGVyUHJvdmlkZXJBYnN0cmFjdCxcbn0gZnJvbSAnLi4vd29ya2Zsb3ctYnVpbGRlci5jb250cm9sbGVyJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgV29ya2Zsb3dCdWlsZGVyU2VydmljZSB7XG4gICAgZGF0YVByb3ZpZGVyOiBXb3JrZmxvd0J1aWxkZXJQcm92aWRlckFic3RyYWN0ID1cbiAgICAgICAgbmV3IFdvcmtmbG93QnVpbGRlclByb3ZpZGVyQXBpKHRoaXMuYXBpU3ZjLCB0aGlzLmNvbnRyb2xsZXIpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXBpU3ZjOiBBemF2aXN0YUFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29udHJvbGxlcjogQXphdmlzdGFXb3JrZmxvd0J1aWxkZXJDb250cm9sbGVyLFxuICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICApIHt9XG5cbiAgICB0cmFuc2xhdGlvbnNMb2FkZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZS5zdG9yZS50cmFuc2xhdGlvbnNbdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmddKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLm9uTGFuZ0NoYW5nZS5waXBlKG1hcCgocmVzKSA9PiAhIXJlcykpO1xuICAgIH1cbn1cbiJdfQ==