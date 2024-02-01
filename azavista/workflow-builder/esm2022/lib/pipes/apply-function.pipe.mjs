import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class ApplyFunctionPipe {
    /**
     * @param callbackMethod method that is to be run using `ApplyFunctionPipe`.
     ** please pass an arrow function instead of class method
     */
    transform(value, callbackMethod, ...extra) {
        return callbackMethod(value, ...extra);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: ApplyFunctionPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: ApplyFunctionPipe, name: "apply" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: ApplyFunctionPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'apply' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktZnVuY3Rpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F6YXZpc3RhL3dvcmtmbG93LWJ1aWxkZXIvc3JjL2xpYi9waXBlcy9hcHBseS1mdW5jdGlvbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQVFwRCxNQUFNLE9BQU8saUJBQWlCO0lBQzFCOzs7T0FHRztJQUNILFNBQVMsQ0FDTCxLQUE4QixFQUM5QixjQUF3QixFQUN4QixHQUFHLEtBQTZCO1FBRWhDLE9BQU8sY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7K0dBWFEsaUJBQWlCOzZHQUFqQixpQkFBaUI7OzRGQUFqQixpQkFBaUI7a0JBRDdCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqIE9idGFpbiB0aGUgYXJndW1lbnRzJyB0eXBlcyBvZiBhIGZ1bmN0aW9uIGV4Y2VwdCB0aGUgZmlyc3QgYXJndW1lbnQgKi9cclxudHlwZSBSZXN0QXJndW1lbnQ8VD4gPSBUIGV4dGVuZHMgKGZpcnN0OiBhbnksIC4uLmFyZ3M6IGluZmVyIFJlc3QpID0+IGFueVxyXG4gICAgPyBSZXN0XHJcbiAgICA6IFtdO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnYXBwbHknIH0pXHJcbmV4cG9ydCBjbGFzcyBBcHBseUZ1bmN0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tNZXRob2QgbWV0aG9kIHRoYXQgaXMgdG8gYmUgcnVuIHVzaW5nIGBBcHBseUZ1bmN0aW9uUGlwZWAuXHJcbiAgICAgKiogcGxlYXNlIHBhc3MgYW4gYXJyb3cgZnVuY3Rpb24gaW5zdGVhZCBvZiBjbGFzcyBtZXRob2RcclxuICAgICAqL1xyXG4gICAgdHJhbnNmb3JtPENhbGxiYWNrIGV4dGVuZHMgKHZhbHVlOiBhbnksIC4uLmV4dHJhOiBhbnlbXSkgPT4gYW55PihcclxuICAgICAgICB2YWx1ZTogUGFyYW1ldGVyczxDYWxsYmFjaz5bMF0sXHJcbiAgICAgICAgY2FsbGJhY2tNZXRob2Q6IENhbGxiYWNrLFxyXG4gICAgICAgIC4uLmV4dHJhOiBSZXN0QXJndW1lbnQ8Q2FsbGJhY2s+XHJcbiAgICApOiBSZXR1cm5UeXBlPENhbGxiYWNrPiB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrTWV0aG9kKHZhbHVlLCAuLi5leHRyYSk7XHJcbiAgICB9XHJcbn1cclxuIl19