import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/** Obtain the arguments' types of a function except the first argument */
type RestArgument<T> = T extends (first: any, ...args: infer Rest) => any ? Rest : [];
export declare class ApplyFunctionPipe implements PipeTransform {
    /**
     * @param callbackMethod method that is to be run using `ApplyFunctionPipe`.
     ** please pass an arrow function instead of class method
     */
    transform<Callback extends (value: any, ...extra: any[]) => any>(value: Parameters<Callback>[0], callbackMethod: Callback, ...extra: RestArgument<Callback>): ReturnType<Callback>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplyFunctionPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ApplyFunctionPipe, "apply", false>;
}
export {};
