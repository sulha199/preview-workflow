import { AzavistaApiService } from '@azavista/servicelib';
export type AzavistaServiceLibCacheProxy<MethodNames extends Array<keyof AzavistaApiService>> = Pick<AzavistaApiService, MethodNames[number]>;
export declare const getAzavistaServiceLibCacheProxy: <MethodNames extends (keyof AzavistaApiService)[]>(apiSvc: AzavistaApiService, methodNames: MethodNames) => AzavistaServiceLibCacheProxy<MethodNames>;
