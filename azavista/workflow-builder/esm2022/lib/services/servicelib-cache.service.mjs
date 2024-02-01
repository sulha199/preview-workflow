export const getAzavistaServiceLibCacheProxy = (apiSvc, methodNames) => {
    const cacheObj = {};
    const cacheObjAny = cacheObj;
    const methods = {};
    methodNames.forEach((name) => {
        methods[name] = async (...params) => {
            const paramsStringified = JSON.stringify(params);
            if (cacheObjAny?.[name]?.[paramsStringified] !== undefined) {
                return cacheObjAny[name][paramsStringified];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const result = await apiSvc[name](...params);
            if (cacheObjAny[name] == null) {
                cacheObjAny[name] = {};
            }
            cacheObjAny[name][paramsStringified] = result;
            return result;
        };
    });
    return methods;
};
// export class AzavistaServiceLibCacheService<
//     MethodNames extends Array<keyof AzavistaApiService>,
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-nocheck
// > implements AzavistaApiServiceMethods<MethodNames>
// {
//     private cacheObj: {
//         [Key in MethodNames[number]]?: {
//             [jsonMethodParams: string]: ReturnType<AzavistaApiService[Key]>;
//         };
//     } = {};
//     constructor(
//         private apiSvc: AzavistaApiService,
//         public methodNames: MethodNames,
//     ) {
//         const cacheObjAny = this.cacheObj as any;
//         methodNames.forEach((name) => {
//             (this as any)[name] = async (...params: any[]) => {
//                 const paramsStringified = JSON.stringify(params);
//                 if (cacheObjAny?.[name]?.[paramsStringified] !== undefined) {
//                     return cacheObjAny[name][paramsStringified];
//                 }
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//                 const result = await (this.apiSvc[name] as any)(...params);
//                 if (cacheObjAny[name] == null) {
//                     cacheObjAny[name] = {};
//                 }
//                 cacheObjAny[name][paramsStringified] = result;
//                 return result;
//             };
//         });
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZWxpYi1jYWNoZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXphdmlzdGEvd29ya2Zsb3ctYnVpbGRlci9zcmMvbGliL3NlcnZpY2VzL3NlcnZpY2VsaWItY2FjaGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRyxDQUczQyxNQUEwQixFQUMxQixXQUF3QixFQUNpQixFQUFFO0lBQzNDLE1BQU0sUUFBUSxHQUlWLEVBQUUsQ0FBQztJQUNQLE1BQU0sV0FBVyxHQUFHLFFBQWUsQ0FBQztJQUNwQyxNQUFNLE9BQU8sR0FBdUQsRUFBRSxDQUFDO0lBQ3ZFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixPQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBYSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDeEQsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUMvQztZQUNELG1FQUFtRTtZQUNuRSxNQUFNLE1BQU0sR0FBRyxNQUFPLE1BQU0sQ0FBQyxJQUFJLENBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUMxQjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUU5QyxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBYyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGLCtDQUErQztBQUMvQywyREFBMkQ7QUFDM0Qsb0VBQW9FO0FBQ3BFLHFCQUFxQjtBQUNyQixzREFBc0Q7QUFDdEQsSUFBSTtBQUNKLDBCQUEwQjtBQUMxQiwyQ0FBMkM7QUFDM0MsK0VBQStFO0FBQy9FLGFBQWE7QUFDYixjQUFjO0FBRWQsbUJBQW1CO0FBQ25CLDhDQUE4QztBQUM5QywyQ0FBMkM7QUFDM0MsVUFBVTtBQUNWLG9EQUFvRDtBQUNwRCwwQ0FBMEM7QUFDMUMsa0VBQWtFO0FBQ2xFLG9FQUFvRTtBQUNwRSxnRkFBZ0Y7QUFDaEYsbUVBQW1FO0FBQ25FLG9CQUFvQjtBQUNwQixzRkFBc0Y7QUFDdEYsOEVBQThFO0FBQzlFLG1EQUFtRDtBQUNuRCw4Q0FBOEM7QUFDOUMsb0JBQW9CO0FBQ3BCLGlFQUFpRTtBQUVqRSxpQ0FBaUM7QUFDakMsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxRQUFRO0FBQ1IsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF6YXZpc3RhQXBpU2VydmljZSB9IGZyb20gJ0BhemF2aXN0YS9zZXJ2aWNlbGliJztcclxuXHJcbmV4cG9ydCB0eXBlIEF6YXZpc3RhU2VydmljZUxpYkNhY2hlUHJveHk8XHJcbiAgICBNZXRob2ROYW1lcyBleHRlbmRzIEFycmF5PGtleW9mIEF6YXZpc3RhQXBpU2VydmljZT4sXHJcbj4gPSBQaWNrPEF6YXZpc3RhQXBpU2VydmljZSwgTWV0aG9kTmFtZXNbbnVtYmVyXT47XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXphdmlzdGFTZXJ2aWNlTGliQ2FjaGVQcm94eSA9IDxcclxuICAgIE1ldGhvZE5hbWVzIGV4dGVuZHMgQXJyYXk8a2V5b2YgQXphdmlzdGFBcGlTZXJ2aWNlPixcclxuPihcclxuICAgIGFwaVN2YzogQXphdmlzdGFBcGlTZXJ2aWNlLFxyXG4gICAgbWV0aG9kTmFtZXM6IE1ldGhvZE5hbWVzLFxyXG4pOiBBemF2aXN0YVNlcnZpY2VMaWJDYWNoZVByb3h5PE1ldGhvZE5hbWVzPiA9PiB7XHJcbiAgICBjb25zdCBjYWNoZU9iajoge1xyXG4gICAgICAgIFtLZXkgaW4gTWV0aG9kTmFtZXNbbnVtYmVyXV0/OiB7XHJcbiAgICAgICAgICAgIFtqc29uTWV0aG9kUGFyYW1zOiBzdHJpbmddOiBSZXR1cm5UeXBlPEF6YXZpc3RhQXBpU2VydmljZVtLZXldPjtcclxuICAgICAgICB9O1xyXG4gICAgfSA9IHt9O1xyXG4gICAgY29uc3QgY2FjaGVPYmpBbnkgPSBjYWNoZU9iaiBhcyBhbnk7XHJcbiAgICBjb25zdCBtZXRob2RzOiBQYXJ0aWFsPEF6YXZpc3RhU2VydmljZUxpYkNhY2hlUHJveHk8TWV0aG9kTmFtZXM+PiA9IHt9O1xyXG4gICAgbWV0aG9kTmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgIChtZXRob2RzIGFzIGFueSlbbmFtZV0gPSBhc3luYyAoLi4ucGFyYW1zOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXNTdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChjYWNoZU9iakFueT8uW25hbWVdPy5bcGFyYW1zU3RyaW5naWZpZWRdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZU9iakFueVtuYW1lXVtwYXJhbXNTdHJpbmdpZmllZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCAoYXBpU3ZjW25hbWVdIGFzIGFueSkoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgaWYgKGNhY2hlT2JqQW55W25hbWVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlT2JqQW55W25hbWVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FjaGVPYmpBbnlbbmFtZV1bcGFyYW1zU3RyaW5naWZpZWRdID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG1ldGhvZHMgYXMgYW55O1xyXG59O1xyXG5cclxuLy8gZXhwb3J0IGNsYXNzIEF6YXZpc3RhU2VydmljZUxpYkNhY2hlU2VydmljZTxcclxuLy8gICAgIE1ldGhvZE5hbWVzIGV4dGVuZHMgQXJyYXk8a2V5b2YgQXphdmlzdGFBcGlTZXJ2aWNlPixcclxuLy8gICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcclxuLy8gICAgIC8vIEB0cy1ub2NoZWNrXHJcbi8vID4gaW1wbGVtZW50cyBBemF2aXN0YUFwaVNlcnZpY2VNZXRob2RzPE1ldGhvZE5hbWVzPlxyXG4vLyB7XHJcbi8vICAgICBwcml2YXRlIGNhY2hlT2JqOiB7XHJcbi8vICAgICAgICAgW0tleSBpbiBNZXRob2ROYW1lc1tudW1iZXJdXT86IHtcclxuLy8gICAgICAgICAgICAgW2pzb25NZXRob2RQYXJhbXM6IHN0cmluZ106IFJldHVyblR5cGU8QXphdmlzdGFBcGlTZXJ2aWNlW0tleV0+O1xyXG4vLyAgICAgICAgIH07XHJcbi8vICAgICB9ID0ge307XHJcblxyXG4vLyAgICAgY29uc3RydWN0b3IoXHJcbi8vICAgICAgICAgcHJpdmF0ZSBhcGlTdmM6IEF6YXZpc3RhQXBpU2VydmljZSxcclxuLy8gICAgICAgICBwdWJsaWMgbWV0aG9kTmFtZXM6IE1ldGhvZE5hbWVzLFxyXG4vLyAgICAgKSB7XHJcbi8vICAgICAgICAgY29uc3QgY2FjaGVPYmpBbnkgPSB0aGlzLmNhY2hlT2JqIGFzIGFueTtcclxuLy8gICAgICAgICBtZXRob2ROYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbi8vICAgICAgICAgICAgICh0aGlzIGFzIGFueSlbbmFtZV0gPSBhc3luYyAoLi4ucGFyYW1zOiBhbnlbXSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGNhY2hlT2JqQW55Py5bbmFtZV0/LltwYXJhbXNTdHJpbmdpZmllZF0gIT09IHVuZGVmaW5lZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZU9iakFueVtuYW1lXVtwYXJhbXNTdHJpbmdpZmllZF07XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCAodGhpcy5hcGlTdmNbbmFtZV0gYXMgYW55KSguLi5wYXJhbXMpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGNhY2hlT2JqQW55W25hbWVdID09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjYWNoZU9iakFueVtuYW1lXSA9IHt9O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgY2FjaGVPYmpBbnlbbmFtZV1bcGFyYW1zU3RyaW5naWZpZWRdID0gcmVzdWx0O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgICAgIH07XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuIl19