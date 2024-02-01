import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { AzavistaFlowBuilderComponent, FlowBuilderStepActionType, FlowBuilderStepEntityType, FlowBuilderStepType, } from '@azavista/components/flow-builder';
import { Subject, takeUntil } from 'rxjs';
import { ISO_LANGUAGES } from '../../types';
import * as i0 from "@angular/core";
import * as i1 from "../../workflow-builder.controller";
import * as i2 from "@azavista/components/shared";
import * as i3 from "@angular/common";
import * as i4 from "@azavista/components/flow-builder";
export class WorkflowBuilderProcessBuilderComponent {
    constructor(controller, cmpSharedSvc, notificationsSvc) {
        this.controller = controller;
        this.cmpSharedSvc = cmpSharedSvc;
        this.notificationsSvc = notificationsSvc;
        this.showOnlyFlowBuilder = false;
        this.processType = "participant" /* ProcessType.participant */;
        this.stages = [];
        /** Field stage options */
        this.fieldsOptions = [];
        this.loaded = false;
        this.templateEventFieldsSubject = new Subject();
        this.stepsSaved = new EventEmitter();
        this.destroyed$ = new Subject();
    }
    async ngOnInit() {
        if (this.eventId) {
            await this.initData(this.eventId);
        }
    }
    async initData(eventId) {
        if (this.controller.dataProvider) {
            this.loaded = false;
            const getWorkflowData = this.controller.dataProvider.dataSourceCallbacks;
            const getProcessData = this.controller.dataProvider.processDataSourceCallback;
            const [integrations, users, eventData] = await Promise.all([
                getProcessData.integrations(),
                getProcessData.users(),
                getProcessData.event(eventId),
            ]);
            this.integrations = integrations;
            this.users = users.map(({ id, first_name, last_name }) => ({
                id: id,
                label: `${first_name} ${last_name}`.trim(),
            }));
            this.event = eventData.detail;
            this.languages = this.getSelectedLanguageItems(eventData.settings.languages, ISO_LANGUAGES);
            this.templateEvents = eventData.templateEvents?.map(({ id, name }) => ({
                id: id,
                label: name,
            }));
            // eslint-disable-next-line max-len
            const getWorkflowDataOptions = { skippedWorkflowIds: [] };
            this.emailTemplates = (await getWorkflowData.Email(eventId, getWorkflowDataOptions)).map((email) => ({ ...email, id: email.id }));
            this.workflowTeams = eventData.teams?.map(({ id, name }) => ({
                id: id,
                label: name,
            }));
            this.docxDocuments = eventData.assets
                .filter((x) => x.filename.toLowerCase().endsWith('.docx'))
                .map((x) => ({ id: x.id, label: x.name }));
            this.documentFields = eventData.participantFields
                .filter((x) => this.cmpSharedSvc.getFieldTypeFromField(x) ===
                'document')
                .map((x) => x);
            const eventFields = (await getProcessData.getEventFields(eventId)).map((field) => ({
                ...field,
                editable: true,
            }));
            this.addNewConfig = this.getAddNewConfig();
            const participantFields = eventData.participantFields
                .filter((x) => x.type !== 'relation')
                .map((field) => ({
                ...field,
                editable: true,
            }));
            this.fields = [
                {
                    entityTypeName: FlowBuilderStepEntityType.event,
                    fields: eventFields,
                    eventFields,
                },
                {
                    entityTypeName: FlowBuilderStepEntityType.participant,
                    fields: participantFields,
                    eventFields,
                },
            ];
            this.emailCampaigns = (await getWorkflowData.Email(eventId, getWorkflowDataOptions)).map((x) => ({ id: x.id, label: x.name }));
            this.templateEventFieldsSubject
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                next: (data) => this.processEventFieldsSubject(data),
            });
            this.loaded = true;
        }
    }
    // constructor(
    //     private eventSvc: EventService,
    //     private activatedRoute: ActivatedRoute,
    //     private apiSvc: AzavistaApiService,
    //     private aclSvc: AclService,
    //     private rsSvc: RequiredScopesService,
    //     private sharedSvc: SharedService,
    //     private notificationsSvc: NotificationsService,
    //     private cmpSharedSvc: AzavistaSharedService,
    //     private readonly processesSharedSvc: ProcessesSharedService,
    // ) {}
    // async ngOnInit(): Promise<void> {
    //     this.processType =
    //         this.processType ||
    //         (this.activatedRoute.snapshot.queryParamMap.get(
    //             'type',
    //         ) as ProcessType) ||
    //         ProcessType.event;
    //     if (!this.event) {
    //         this.eventSvc.setEventIdQueryParam(this.activatedRoute);
    //         this.event = this.eventSvc.getEvent();
    //         if (!this.event) {
    //             const eventId =
    //                 this.activatedRoute.snapshot.queryParamMap.get('eventId');
    //             this.event = await this.eventSvc.loadEvent(eventId);
    //         }
    //     }
    //     if (!this.fullProcess) {
    //         const processId =
    //             this.activatedRoute.snapshot.queryParamMap.get('processId');
    //         if (processId) {
    //             await this.loadProcess(processId);
    //         }
    //     } else {
    //         this.changeEmailFromFieldToEmailFromEventField(
    //             this.fullProcess.steps,
    //         );
    //     }
    //     const campaigns = await this.getPublishedEmailCampaigns();
    //     this.emailTemplates = campaigns.map(
    //         (x) => ({ id: x.id, name: x.name }) as FlowBuilderEmailTemplate,
    //     );
    //     this.languages = await this.getLanguages();
    //     this.emailCampaigns = this.getEmailCampaignsAsIdWithLabel(campaigns);
    //     this.integrations = await this.sharedSvc.getPartialIntegrations();
    //     const allUsers = await this.apiSvc.getAllUsers();
    //     this.sharedSvc.sortAlphabetically(allUsers, (x) => x.email);
    //     this.users = allUsers.map(
    //         (x) => ({ id: x.id, label: x.email }) as INumericIdWithLabel,
    //     );
    //     if (this.event.type === EventType.workflow) {
    //         const searchTeamsRequest: ISearchTeamsRequest = {
    //             limit: 50,
    //             offset: 0,
    //         };
    //         searchTeamsRequest.advancedQuery =
    //             this.sharedSvc.createIdInSearchParams(this.event.team_ids);
    //         const searchTeamsResponse =
    //             await this.apiSvc.searchTeams(searchTeamsRequest);
    //         this.workflowTeams = searchTeamsResponse.teams.map(
    //             (x) => ({ id: x.id, label: x.name }) as INumericIdWithLabel,
    //         );
    //         const allTemplateEvents = await this.apiSvc.getAllEvents(
    //             EventType.template,
    //         );
    //         this.templateEvents = allTemplateEvents.map(
    //             (x) => ({ id: x.id, label: x.name }) as IIdWithLabel,
    //         );
    //     }
    //     this.stages = await this.apiSvc.getAllStages('event', this.event.id);
    //     this.createAclObjects();
    //     const allEventFields = await this.apiSvc.getAllEventFields(
    //         this.event.id,
    //     );
    //     const allEventParticipantFields =
    //         await this.apiSvc.getAllEventParticipantFields(this.event.id);
    //     const allProfilePages = await this.sharedSvc.getAllProfilePages();
    //     await this.sharedSvc.addProfilePageIdField(
    //         allEventParticipantFields,
    //         true,
    //         allProfilePages,
    //     );
    //     this.sharedSvc.addParticipantStageIdField(
    //         allEventParticipantFields,
    //         this.stages,
    //     );
    //     this.fieldsOptions = [];
    //     await this.sharedSvc.addFieldOptionsForProfilePageField(
    //         this.fieldsOptions,
    //         allEventParticipantFields,
    //         allProfilePages,
    //     );
    //     this.sharedSvc.addFieldOptionsForStageField(
    //         this.stages,
    //         this.fieldsOptions,
    //     );
    //     const eventFields = this.prepareFields(allEventFields);
    //     this.sharedSvc.sortAlphabetically(eventFields, (item) => item.label);
    //     const eventParticipantFields = this.prepareFields(
    //         allEventParticipantFields,
    //     );
    //     this.sharedSvc.sortAlphabetically(
    //         eventParticipantFields,
    //         (item) => item.label,
    //     );
    //     const allEventAssets = await this.apiSvc.getAllEventAssets(
    //         this.event.id,
    //     );
    //     this.docxDocuments = allEventAssets
    //         .filter((x) => x.filename.toLowerCase().endsWith('.docx'))
    //         .map((x) => ({ id: x.id, label: x.name }) as IIdWithLabel);
    //     this.documentFields = eventParticipantFields
    //         .filter(
    //             (x) =>
    //                 this.cmpSharedSvc.getFieldTypeFromField(x) === 'document',
    //         )
    //         .map((x) => x as IIdWithLabel);
    //     this.addNewConfig = this.getAddNewConfig();
    //     this.fields = [
    //         {
    //             entityTypeName: FlowBuilderStepEntityType.event,
    //             fields: eventFields,
    //             eventFields: eventFields,
    //         },
    //         {
    //             entityTypeName: FlowBuilderStepEntityType.participant,
    //             fields: this.sharedSvc.filterOutRelationFields(
    //                 eventParticipantFields,
    //             ),
    //             eventFields: eventFields,
    //         },
    //     ];
    //     this.templateEventFieldsSubject
    //         .pipe(takeUntil(this.destroyed$))
    //         .subscribe({
    //             next: (data) => this.processEventFieldsSubject(data),
    //         });
    //     this.loaded = true;
    // }
    async processEventFieldsSubject(data) {
        if (data.type === "fieldsRequired" /* TemplateEventFieldsSubjectMessageType.fieldsRequired */) {
            const body = 
            // eslint-disable-next-line max-len
            data.body;
            const requesterFields = this.fields?.find((x) => x.entityTypeName === FlowBuilderStepEntityType.participant)?.fields;
            const templateEventFields = 
            // eslint-disable-next-line max-len
            await this.controller.dataProvider?.processDataSourceCallback.getEventFields(body.eventTemplateId);
            // eslint-disable-next-line max-len
            const msgBody = {
                eventFields: templateEventFields ?? [],
                requesterFields: requesterFields ?? [],
                eventTemplateId: body.eventTemplateId,
                step: body.step,
            };
            this.templateEventFieldsSubject.next({
                type: "fieldsAvailable" /* TemplateEventFieldsSubjectMessageType.fieldsAvailable */,
                body: msgBody,
            });
        }
    }
    // getEmailCampaignsAsIdWithLabel(
    //     campaigns: IEmailCampaign[],
    // ): IIdWithLabel[] {
    //     return campaigns.map(
    //         (x) => ({ id: x.id, label: x.name }) as IIdWithLabel,
    //     );
    // }
    // async getPublishedEmailCampaigns(): Promise<IEmailCampaign[]> {
    //     const req = {
    //         eventId: this.event.id,
    //         limit: 50,
    //         offset: 0,
    //         sortFieldName: 'name',
    //         sortDirection: 'asc',
    //     } as ISearchEventEmailCampaignsRequest;
    //     const { campaigns } = await this.apiSvc.searchEventEmailCampaigns(req);
    //     const publishedCampaigns: IEmailCampaign[] = [];
    //     const allEmailTemplates = await this.apiSvc.getAllPages(
    //         PageType.emailTemplate,
    //         this.event.id,
    //     );
    //     let emailTemplate: IPage;
    //     for (const campaign of campaigns) {
    //         emailTemplate = allEmailTemplates.find(
    //             (template) => template.id === campaign.emailtemplate_id,
    //         );
    //         emailTemplate && emailTemplate.is_published
    //             ? publishedCampaigns.push(campaign)
    //             : null;
    //     }
    //     return publishedCampaigns;
    // }
    // async getLanguages(): Promise<IIdWithLabel[]> {
    //     const eventSettings = await this.apiSvc.getEventSettings(this.event.id);
    //     const allSupportedLanguages =
    //         await this.sharedSvc.getAllSupportedIsoLanguages();
    //     const languages = this.sharedSvc.getSelectedLanguageItems(
    //         eventSettings.settings.languages,
    //         allSupportedLanguages,
    //     );
    //     return languages;
    // }
    async onChangesSaved(steps) {
        try {
            // Some of the participant entity types and specific actions should be sent differently to the server
            // For example if action type is FlowBuilderStepActionType.emailFromEventField it must be changed to
            // FlowBuilderStepActionType.emailFromField and the field.type to FlowBuilderStepEntityType.event
            this.changeEmailFromEventFieldToEmailFromField(steps);
            this.changeDecisionConfigs(steps);
            this.stepsSaved.emit(steps);
            // TODO: handle on reload process
            // await this.apiSvc.setProcessSteps(this.fullProcess.id, steps);
            // await this.loadProcess(this.fullProcess.id);
        }
        catch (e) {
            if (this.azFlowBuilder) {
                this.azFlowBuilder.editMode = true;
            }
        }
    }
    changeDecisionConfigs(steps) {
        // Decisions for participants can have two types if the user selects one and the other
        // TODO: Should we move this logic to the components library ?
        for (const step of steps) {
            // const stepAny = step as any;
            if (step.type === FlowBuilderStepType.decision) {
                // The 'decision' type should not have 'config' attribute
                delete step.config;
            }
            else if (step.type === FlowBuilderStepType.decisionExternalCRM) {
                // The 'decision_externalcrm' type should not have 'condition' attribute
                delete step.condition;
            }
        }
    }
    changeEmailFromEventFieldToEmailFromField(steps) {
        for (const step of steps) {
            const stepAny = step;
            if (stepAny.config?.action ===
                FlowBuilderStepActionType.emailFromEventField) {
                stepAny.config.action =
                    FlowBuilderStepActionType.emailFromField;
                stepAny.config.field.type = FlowBuilderStepEntityType.event;
            }
        }
    }
    changeEmailFromFieldToEmailFromEventField(steps) {
        for (const step of steps) {
            const stepAny = step;
            if (stepAny.config?.action ===
                FlowBuilderStepActionType.emailFromField &&
                stepAny.config.field?.type === FlowBuilderStepEntityType.event) {
                stepAny.config.action =
                    FlowBuilderStepActionType.emailFromEventField;
                stepAny.config.field.type =
                    FlowBuilderStepEntityType.participant;
            }
        }
    }
    // createAclObjects(): void {
    //     const eventTeamIds = this.event.team_ids;
    //     if (this.processType === ProcessType.event) {
    //         this.canEditStepsAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanUpdateEvent(),
    //         );
    //         this.canEditPausedAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanPauseEvent(),
    //         );
    //         this.canInterruptAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanInterruptEvent(),
    //         );
    //     } else if (this.processType === ProcessType.participant) {
    //         this.canEditStepsAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanUpdateParticipant(),
    //         );
    //         this.canEditPausedAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanPauseParticipant(),
    //         );
    //         this.canInterruptAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanInterruptParticipant(),
    //         );
    //     } else if (this.processType === ProcessType.booking) {
    //         // TODO: Scopes
    //         this.canEditStepsAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanUpdateParticipant(),
    //         );
    //         this.canEditPausedAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanPauseParticipant(),
    //         );
    //         this.canInterruptAcl = this.aclSvc.getAclObject(
    //             eventTeamIds,
    //             this.rsSvc.getProcessScopesCanInterruptParticipant(),
    //         );
    //     }
    // }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadProcess(processId) {
        // TODO: handle reload process
        // this.fullProcess = await this.apiSvc.getProcess(processId);
        // this.changeEmailFromFieldToEmailFromEventField(this.fullProcess.steps);
    }
    // prepareFields(fields: IField[]): IField[] {
    //     if (!fields) {
    //         return [];
    //     }
    //     return fields
    //         .filter((x) => {
    //             const fieldType = this.cmpSharedSvc.getFieldTypeFromField(x);
    //             return fieldType !== 'virtual-relation';
    //         })
    //         .map((x) => {
    //             x.editable = true;
    //             return x;
    //         });
    // }
    getAvailableStepTypes() {
        const availableStepTypes = [
            FlowBuilderStepType.wait,
            FlowBuilderStepType.waitUntilField,
            FlowBuilderStepType.action,
        ];
        const updateLightAcl = this.getAclObjectForCurrentUser?.();
        if (updateLightAcl?.allowed) {
            availableStepTypes.push(...[
                FlowBuilderStepType.decision,
                FlowBuilderStepType.decisionExternalCRM,
                FlowBuilderStepType.decisionNow,
                // FlowBuilderStepType.stageChange, // TODO: should be enabled when the stage/workflow(s) are provided
            ]);
        }
        return availableStepTypes;
    }
    getAddNewConfig() {
        // const eventActions: FlowBuilderStepActionType[] = [
        //     FlowBuilderStepActionType.emailFromField,
        //     FlowBuilderStepActionType.sendWebhook
        // ];
        const eventActions = [
            FlowBuilderStepActionType.setField,
            FlowBuilderStepActionType.addTeam,
            FlowBuilderStepActionType.removeTeam,
            FlowBuilderStepActionType.setDateTimeFieldToCurrent,
            FlowBuilderStepActionType.sendWebhook,
            FlowBuilderStepActionType.sendGenericEmail,
            FlowBuilderStepActionType.setReferenceNumber,
            FlowBuilderStepActionType.sendObject,
            FlowBuilderStepActionType.copyEventDates,
        ];
        const participantActions = [
            FlowBuilderStepActionType.setField,
            FlowBuilderStepActionType.email,
            FlowBuilderStepActionType.setDateTimeFieldToCurrent,
            FlowBuilderStepActionType.generateCertificate,
        ];
        const bookingActions = [
            FlowBuilderStepActionType.sendWebhook,
        ];
        if (this.event?.type === "workflow" /* EventType.workflow */) {
            // Add two more participant action types
            participantActions.push(FlowBuilderStepActionType.addTeam);
            participantActions.push(FlowBuilderStepActionType.removeTeam);
            participantActions.push(FlowBuilderStepActionType.createEvent);
        }
        participantActions.push(FlowBuilderStepActionType.generalEmail);
        participantActions.push(FlowBuilderStepActionType.emailFromField);
        participantActions.push(FlowBuilderStepActionType.emailFromEventField);
        participantActions.push(FlowBuilderStepActionType.sendWebhook);
        participantActions.push(FlowBuilderStepActionType.setReferenceNumber);
        participantActions.push(FlowBuilderStepActionType.sendObject);
        participantActions.push(FlowBuilderStepActionType.countSelectField);
        participantActions.push(FlowBuilderStepActionType.copyEventTextField);
        participantActions.push(FlowBuilderStepActionType.messageToParticipant);
        participantActions.push(FlowBuilderStepActionType.sendMessageToUser);
        let availableEntityTypeNames;
        if (this.processType === "event" /* ProcessType.event */) {
            availableEntityTypeNames = [FlowBuilderStepEntityType.event];
        }
        else {
            availableEntityTypeNames = [
                FlowBuilderStepEntityType.participant,
                FlowBuilderStepEntityType.event,
            ];
        }
        const addNewConfig = {
            availableStepTypes: this.getAvailableStepTypes(),
            decisionStepConfig: {
                entityTypeNames: availableEntityTypeNames,
            },
            actionStepConfig: {
                entityTypes: [
                // {
                //     entityTypeName: FlowBuilderStepEntityType.participant,
                //     actions: participantActions
                // },
                // {
                //     entityTypeName: FlowBuilderStepEntityType.event,
                //     actions: eventActions
                // }
                ],
            },
        };
        if (this.processType === "participant" /* ProcessType.participant */) {
            addNewConfig.actionStepConfig?.entityTypes.push({
                entityTypeName: FlowBuilderStepEntityType.participant,
                actions: participantActions,
            });
        }
        else if (this.processType === "event" /* ProcessType.event */) {
            addNewConfig.actionStepConfig?.entityTypes.push({
                entityTypeName: FlowBuilderStepEntityType.event,
                actions: eventActions,
            });
        }
        else if (this.processType === "booking" /* ProcessType.booking */) {
            addNewConfig.actionStepConfig?.entityTypes.push({
                entityTypeName: FlowBuilderStepEntityType.booking,
                actions: bookingActions,
            });
        }
        return addNewConfig;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async onFlowPausedChanged(paused) {
        // TODO: on flow pause
        // await this.processesSharedSvc.onFlowPausedChanged(
        //     paused,
        //     this.fullProcess,
        // );
    }
    async onFlowInterrupted() {
        const confirmResult = await this.showProcessInterruptionConfirmation();
        if (!confirmResult) {
            return;
        }
        try {
            // TODO: onFlowInterrupted
            // await this.apiSvc.interruptProcess(this.fullProcess.id);
            // await this.loadProcess(this.fullProcess.id);
        }
        catch (e) {
            /* empty */
        }
    }
    // eslint-disable-next-line max-len
    async showProcessInterruptionConfirmation() {
        return true;
        // TODO: create confirmation
        // return this.cmpSharedSvc.showConfirmationDialog(
        //     this.cmpSharedSvc.translate(TranslationKey.interruptWorkflow),
        //     [
        //         this.cmpSharedSvc.translate(
        //             TranslationKey.interruptWorkflowDialogAreYouSure,
        //         ),
        //     ],
        // );
    }
    onNotConfigured() {
        const msg = this.cmpSharedSvc.translate('PROCESS_STEPS_NOT_CONFIGURED');
        this.notificationsSvc.showMessage("warning" /* NotificationMessageType.warning */, msg);
    }
    // ngOnDestroy(): void {
    //     this.destroyed$.next();
    //     this.destroyed$.complete();
    // }
    getSelectedLanguageItems(selectedIds, languageItems) {
        const selectedItems = [];
        for (const eventLang of selectedIds) {
            const isoLang = languageItems.find((x) => x.id === eventLang);
            if (isoLang) {
                selectedItems.push(isoLang);
            }
        }
        return selectedItems;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderComponent, deps: [{ token: i1.AzavistaWorkflowBuilderController }, { token: i2.AzavistaSharedService }, { token: i2.NotificationsService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderProcessBuilderComponent, selector: "azavista-workflow-builder-process-builder", inputs: { eventId: "eventId", getAclObjectForCurrentUser: "getAclObjectForCurrentUser", fullProcess: "fullProcess", showOnlyFlowBuilder: "showOnlyFlowBuilder", processType: "processType" }, outputs: { stepsSaved: "stepsSaved" }, viewQueries: [{ propertyName: "azFlowBuilder", first: true, predicate: AzavistaFlowBuilderComponent, descendants: true }], ngImport: i0, template: "<azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [steps]=\"fullProcess?.steps ?? []\"\r\n    [title]=\"fullProcess?.name ?? ''\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"false\"\r\n    [flowPaused]=\"!!fullProcess?.paused\"\r\n    [addNewConfig]=\"$any(addNewConfig)\"\r\n    [emailTemplates]=\"emailTemplates ?? []\"\r\n    [teams]=\"workflowTeams ?? []\"\r\n    [emailCampaigns]=\"emailCampaigns ?? []\"\r\n    [integrations]=\"$any(integrations) ?? []\"\r\n    [users]=\"users ?? []\"\r\n    [languages]=\"languages ?? []\"\r\n    [templateEvents]=\"templateEvents ?? []\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages \"\r\n    [fields]=\"fields ?? []\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments ?? []\"\r\n    [documentFields]=\"documentFields ?? []\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder>\r\n\r\n\r\n<!-- <azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [canEditStepsAcl]=\"canEditStepsAcl\"\r\n    [canEditPausedAcl]=\"canEditPausedAcl\"\r\n    [canInterruptAcl]=\"canInterruptAcl\"\r\n    [steps]=\"fullProcess?.steps\"\r\n    [title]=\"fullProcess?.name\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"true\"\r\n    [flowPaused]=\"fullProcess?.paused\"\r\n    [addNewConfig]=\"addNewConfig\"\r\n    [emailTemplates]=\"emailTemplates\"\r\n    [teams]=\"workflowTeams\"\r\n    [emailCampaigns]=\"emailCampaigns\"\r\n    [integrations]=\"integrations\"\r\n    [users]=\"users\"\r\n    [languages]=\"languages\"\r\n    [templateEvents]=\"templateEvents\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages\"\r\n    [fields]=\"fields\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments\"\r\n    [documentFields]=\"documentFields\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder> -->\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.AzavistaFlowBuilderComponent, selector: "azavista-flow-builder", inputs: ["canEditStepsAcl", "canEditPausedAcl", "canInterruptAcl", "steps", "title", "canEditSteps", "canEditStatus", "addNewConfig", "globalProcessEntityType", "stages", "fields", "fieldsOptions", "emailTemplates", "teams", "users", "events", "emailCampaigns", "integrations", "languages", "flowPaused", "templateEvents", "templateEventFieldsSubject", "isGlobalParticipant", "docxDocuments", "documentFields"], outputs: ["changesSaved", "notConfigured", "flowPausedChanged", "flowInterrupted"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-process-builder', template: "<azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [steps]=\"fullProcess?.steps ?? []\"\r\n    [title]=\"fullProcess?.name ?? ''\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"false\"\r\n    [flowPaused]=\"!!fullProcess?.paused\"\r\n    [addNewConfig]=\"$any(addNewConfig)\"\r\n    [emailTemplates]=\"emailTemplates ?? []\"\r\n    [teams]=\"workflowTeams ?? []\"\r\n    [emailCampaigns]=\"emailCampaigns ?? []\"\r\n    [integrations]=\"$any(integrations) ?? []\"\r\n    [users]=\"users ?? []\"\r\n    [languages]=\"languages ?? []\"\r\n    [templateEvents]=\"templateEvents ?? []\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages \"\r\n    [fields]=\"fields ?? []\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments ?? []\"\r\n    [documentFields]=\"documentFields ?? []\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder>\r\n\r\n\r\n<!-- <azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [canEditStepsAcl]=\"canEditStepsAcl\"\r\n    [canEditPausedAcl]=\"canEditPausedAcl\"\r\n    [canInterruptAcl]=\"canInterruptAcl\"\r\n    [steps]=\"fullProcess?.steps\"\r\n    [title]=\"fullProcess?.name\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"true\"\r\n    [flowPaused]=\"fullProcess?.paused\"\r\n    [addNewConfig]=\"addNewConfig\"\r\n    [emailTemplates]=\"emailTemplates\"\r\n    [teams]=\"workflowTeams\"\r\n    [emailCampaigns]=\"emailCampaigns\"\r\n    [integrations]=\"integrations\"\r\n    [users]=\"users\"\r\n    [languages]=\"languages\"\r\n    [templateEvents]=\"templateEvents\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages\"\r\n    [fields]=\"fields\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments\"\r\n    [documentFields]=\"documentFields\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder> -->\r\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AzavistaWorkflowBuilderController }, { type: i2.AzavistaSharedService }, { type: i2.NotificationsService }]; }, propDecorators: { eventId: [{
                type: Input
            }], getAclObjectForCurrentUser: [{
                type: Input
            }], fullProcess: [{
                type: Input
            }], showOnlyFlowBuilder: [{
                type: Input
            }], processType: [{
                type: Input
            }], azFlowBuilder: [{
                type: ViewChild,
                args: [AzavistaFlowBuilderComponent]
            }], stepsSaved: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXphdmlzdGEvd29ya2Zsb3ctYnVpbGRlci9zcmMvbGliL2NvbXBvbmVudHMvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXphdmlzdGEvd29ya2Zsb3ctYnVpbGRlci9zcmMvbGliL2NvbXBvbmVudHMvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIvd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFrQnZCLE9BQU8sRUFDSCw0QkFBNEIsRUFJNUIseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUN6QixtQkFBbUIsR0FNdEIsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFlLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFXekQsTUFBTSxPQUFPLHNDQUFzQztJQTBEL0MsWUFDWSxVQUE2QyxFQUM3QyxZQUFtQyxFQUNuQyxnQkFBc0M7UUFGdEMsZUFBVSxHQUFWLFVBQVUsQ0FBbUM7UUFDN0MsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7UUFwRHpDLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUU1QixnQkFBVywrQ0FBd0M7UUFV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O0lBRUosd0JBQXdCLENBQ3BCLFdBQXFCLEVBQ3JCLGFBQThCO1FBRTlCLE1BQU0sYUFBYSxHQUFvQixFQUFFLENBQUM7UUFDMUMsS0FBSyxNQUFNLFNBQVMsSUFBSSxXQUFXLEVBQUU7WUFDakMsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUM5RCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1NBQ0o7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDOytHQTFxQlEsc0NBQXNDO21HQUF0QyxzQ0FBc0MscVdBbURwQyw0QkFBNEIsZ0RDdEczQyxrdEVBeURBOzs0RkROYSxzQ0FBc0M7a0JBTGxELFNBQVM7K0JBQ0ksMkNBQTJDOytMQUs1QyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUlHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBeUNOLGFBQWE7c0JBRFosU0FBUzt1QkFBQyw0QkFBNEI7Z0JBRzdCLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBFdmVudFR5cGUsXG4gICAgSUV2ZW50LFxuICAgIElMYW5ndWFnZUl0ZW0sXG4gICAgSVByb2Nlc3NGdWxsLFxuICAgIElTdGFnZSxcbiAgICBTdGVwLFxufSBmcm9tICdAYXphdmlzdGEvc2VydmljZWxpYic7XG5pbXBvcnQge1xuICAgIEF6YXZpc3RhU2hhcmVkU2VydmljZSxcbiAgICBJQWNsT2JqZWN0LFxuICAgIElGaWVsZElkV2l0aE9wdGlvbnMsXG4gICAgSUlkV2l0aExhYmVsLFxuICAgIElOdW1lcmljSWRXaXRoTGFiZWwsXG4gICAgTm90aWZpY2F0aW9uTWVzc2FnZVR5cGUsXG4gICAgTm90aWZpY2F0aW9uc1NlcnZpY2UsXG59IGZyb20gJ0BhemF2aXN0YS9jb21wb25lbnRzL3NoYXJlZCc7XG5pbXBvcnQge1xuICAgIEF6YXZpc3RhRmxvd0J1aWxkZXJDb21wb25lbnQsXG4gICAgRmxvd0J1aWxkZXJBZGROZXdDb25maWcsXG4gICAgRmxvd0J1aWxkZXJFbWFpbFRlbXBsYXRlLFxuICAgIEZsb3dCdWlsZGVyRW50aXR5VHlwZUZpZWxkcyxcbiAgICBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLFxuICAgIEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUsXG4gICAgRmxvd0J1aWxkZXJTdGVwVHlwZSxcbiAgICBJSW50ZWdyYXRpb25QYXJ0aWFsLFxuICAgIElUZW1wbGF0ZUV2ZW50RmllbGRzU3ViamVjdEZpZWxkc0F2YWlsYWJsZU1lc3NhZ2VCb2R5LFxuICAgIElUZW1wbGF0ZUV2ZW50RmllbGRzU3ViamVjdEZpZWxkc1JlcXVpcmVkTWVzc2FnZUJvZHksXG4gICAgSVRlbXBsYXRlRXZlbnRGaWVsZHNTdWJqZWN0TWVzc2FnZSxcbiAgICBUZW1wbGF0ZUV2ZW50RmllbGRzU3ViamVjdE1lc3NhZ2VUeXBlLFxufSBmcm9tICdAYXphdmlzdGEvY29tcG9uZW50cy9mbG93LWJ1aWxkZXInO1xuaW1wb3J0IHsgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJU09fTEFOR1VBR0VTLCBQcm9jZXNzVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICAgQXphdmlzdGFXb3JrZmxvd0J1aWxkZXJDb250cm9sbGVyLFxuICAgIFdvcmtmbG93QnVpbGRlckRhdGFTb3VyY2VDYWxsYmFja3NPcHRpb25zLFxufSBmcm9tICcuLi8uLi93b3JrZmxvdy1idWlsZGVyLmNvbnRyb2xsZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F6YXZpc3RhLXdvcmtmbG93LWJ1aWxkZXItcHJvY2Vzcy1idWlsZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogYC4vd29ya2Zsb3ctYnVpbGRlci1wcm9jZXNzLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWxgLFxuICAgIHN0eWxlVXJsczogWycuL3dvcmtmbG93LWJ1aWxkZXItcHJvY2Vzcy1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtmbG93QnVpbGRlclByb2Nlc3NCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBldmVudElkPzogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZ2V0QWNsT2JqZWN0Rm9yQ3VycmVudFVzZXI/OiAoKSA9PiBJQWNsT2JqZWN0O1xuXG4gICAgZXZlbnQ/OiBJRXZlbnQ7XG5cbiAgICBASW5wdXQoKSBmdWxsUHJvY2Vzcz86IElQcm9jZXNzRnVsbDtcblxuICAgIEBJbnB1dCgpIHNob3dPbmx5Rmxvd0J1aWxkZXIgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHByb2Nlc3NUeXBlOiBQcm9jZXNzVHlwZSA9IFByb2Nlc3NUeXBlLnBhcnRpY2lwYW50O1xuXG4gICAgLy8gY2FuRWRpdFN0ZXBzQWNsPzogSUFjbE9iamVjdDtcblxuICAgIC8vIGNhbkVkaXRQYXVzZWRBY2w/OiBJQWNsT2JqZWN0O1xuXG4gICAgLy8gY2FuSW50ZXJydXB0QWNsPzogSUFjbE9iamVjdDtcblxuICAgIGFkZE5ld0NvbmZpZz86IEZsb3dCdWlsZGVyQWRkTmV3Q29uZmlnO1xuXG4gICAgc3RhZ2VzOiBJU3RhZ2VbXSA9IFtdO1xuXG4gICAgLyoqIEZpZWxkIHN0YWdlIG9wdGlvbnMgKi9cbiAgICBmaWVsZHNPcHRpb25zOiBJRmllbGRJZFdpdGhPcHRpb25zW10gPSBbXTtcblxuICAgIGZpZWxkcz86IEZsb3dCdWlsZGVyRW50aXR5VHlwZUZpZWxkc1tdO1xuXG4gICAgbG9hZGVkID0gZmFsc2U7XG5cbiAgICBlbWFpbFRlbXBsYXRlcz86IEZsb3dCdWlsZGVyRW1haWxUZW1wbGF0ZVtdO1xuXG4gICAgd29ya2Zsb3dUZWFtcz86IElOdW1lcmljSWRXaXRoTGFiZWxbXSB8IHVuZGVmaW5lZDtcblxuICAgIGVtYWlsQ2FtcGFpZ25zPzogSUlkV2l0aExhYmVsW107XG5cbiAgICBsYW5ndWFnZXM/OiBJSWRXaXRoTGFiZWxbXTtcblxuICAgIHRlbXBsYXRlRXZlbnRzOiBJSWRXaXRoTGFiZWxbXSB8IHVuZGVmaW5lZDtcblxuICAgIGludGVncmF0aW9ucz86IElJbnRlZ3JhdGlvblBhcnRpYWxbXTtcblxuICAgIHVzZXJzPzogSU51bWVyaWNJZFdpdGhMYWJlbFtdO1xuXG4gICAgdGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3QgPVxuICAgICAgICBuZXcgU3ViamVjdDxJVGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RNZXNzYWdlPigpO1xuXG4gICAgZG9jeERvY3VtZW50cz86IElJZFdpdGhMYWJlbFtdO1xuXG4gICAgZG9jdW1lbnRGaWVsZHM/OiBJSWRXaXRoTGFiZWxbXTtcblxuICAgIEBWaWV3Q2hpbGQoQXphdmlzdGFGbG93QnVpbGRlckNvbXBvbmVudClcbiAgICBhekZsb3dCdWlsZGVyPzogQXphdmlzdGFGbG93QnVpbGRlckNvbXBvbmVudDtcblxuICAgIEBPdXRwdXQoKSBzdGVwc1NhdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxTdGVwW10+KCk7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29udHJvbGxlcjogQXphdmlzdGFXb3JrZmxvd0J1aWxkZXJDb250cm9sbGVyLFxuICAgICAgICBwcml2YXRlIGNtcFNoYXJlZFN2YzogQXphdmlzdGFTaGFyZWRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbnNTdmM6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICkge31cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5ldmVudElkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXREYXRhKHRoaXMuZXZlbnRJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGluaXREYXRhKGV2ZW50SWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmRhdGFQcm92aWRlcikge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGdldFdvcmtmbG93RGF0YSA9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRhdGFQcm92aWRlci5kYXRhU291cmNlQ2FsbGJhY2tzO1xuICAgICAgICAgICAgY29uc3QgZ2V0UHJvY2Vzc0RhdGEgPVxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5kYXRhUHJvdmlkZXIucHJvY2Vzc0RhdGFTb3VyY2VDYWxsYmFjaztcbiAgICAgICAgICAgIGNvbnN0IFtpbnRlZ3JhdGlvbnMsIHVzZXJzLCBldmVudERhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGdldFByb2Nlc3NEYXRhLmludGVncmF0aW9ucygpLFxuICAgICAgICAgICAgICAgIGdldFByb2Nlc3NEYXRhLnVzZXJzKCksXG4gICAgICAgICAgICAgICAgZ2V0UHJvY2Vzc0RhdGEuZXZlbnQoZXZlbnRJZCksXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZWdyYXRpb25zID0gaW50ZWdyYXRpb25zIGFzIElJbnRlZ3JhdGlvblBhcnRpYWxbXTtcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSB1c2Vycy5tYXAoKHsgaWQsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBpZCEsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGAke2ZpcnN0X25hbWV9ICR7bGFzdF9uYW1lfWAudHJpbSgpLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5ldmVudCA9IGV2ZW50RGF0YS5kZXRhaWw7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IHRoaXMuZ2V0U2VsZWN0ZWRMYW5ndWFnZUl0ZW1zKFxuICAgICAgICAgICAgICAgIGV2ZW50RGF0YS5zZXR0aW5ncy5sYW5ndWFnZXMsXG4gICAgICAgICAgICAgICAgSVNPX0xBTkdVQUdFUyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlRXZlbnRzID0gZXZlbnREYXRhLnRlbXBsYXRlRXZlbnRzPy5tYXAoXG4gICAgICAgICAgICAgICAgKHsgaWQsIG5hbWUgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkISxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG5hbWUsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgICAgIGNvbnN0IGdldFdvcmtmbG93RGF0YU9wdGlvbnM6IFdvcmtmbG93QnVpbGRlckRhdGFTb3VyY2VDYWxsYmFja3NPcHRpb25zID1cbiAgICAgICAgICAgICAgICB7IHNraXBwZWRXb3JrZmxvd0lkczogW10gfTtcblxuICAgICAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlcyA9IChcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXRXb3JrZmxvd0RhdGEuRW1haWwoZXZlbnRJZCwgZ2V0V29ya2Zsb3dEYXRhT3B0aW9ucylcbiAgICAgICAgICAgICkubWFwKChlbWFpbCkgPT4gKHsgLi4uZW1haWwsIGlkOiBlbWFpbC5pZCEgfSkpO1xuICAgICAgICAgICAgdGhpcy53b3JrZmxvd1RlYW1zID0gZXZlbnREYXRhLnRlYW1zPy5tYXAoKHsgaWQsIG5hbWUgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICBpZDogaWQhLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5kb2N4RG9jdW1lbnRzID0gZXZlbnREYXRhLmFzc2V0c1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnLmRvY3gnKSlcbiAgICAgICAgICAgICAgICAubWFwKCh4KSA9PiAoeyBpZDogeC5pZCEsIGxhYmVsOiB4Lm5hbWUgfSkpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEZpZWxkcyA9IGV2ZW50RGF0YS5wYXJ0aWNpcGFudEZpZWxkc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICh4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbXBTaGFyZWRTdmMuZ2V0RmllbGRUeXBlRnJvbUZpZWxkKHgpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1hcCgoeCkgPT4geCBhcyBJSWRXaXRoTGFiZWwpO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRGaWVsZHMgPSAoXG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0UHJvY2Vzc0RhdGEuZ2V0RXZlbnRGaWVsZHMoZXZlbnRJZClcbiAgICAgICAgICAgICkubWFwKChmaWVsZCkgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5maWVsZCxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3Q29uZmlnID0gdGhpcy5nZXRBZGROZXdDb25maWcoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRpY2lwYW50RmllbGRzID0gZXZlbnREYXRhLnBhcnRpY2lwYW50RmllbGRzXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gKHgudHlwZSBhcyBhbnkpICE9PSAncmVsYXRpb24nKVxuICAgICAgICAgICAgICAgIC5tYXAoKGZpZWxkKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlTmFtZTogRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5ldmVudCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBldmVudEZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRGaWVsZHMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGVOYW1lOiBGbG93QnVpbGRlclN0ZXBFbnRpdHlUeXBlLnBhcnRpY2lwYW50LFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHBhcnRpY2lwYW50RmllbGRzLFxuICAgICAgICAgICAgICAgICAgICBldmVudEZpZWxkcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMuZW1haWxDYW1wYWlnbnMgPSAoXG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0V29ya2Zsb3dEYXRhLkVtYWlsKGV2ZW50SWQsIGdldFdvcmtmbG93RGF0YU9wdGlvbnMpXG4gICAgICAgICAgICApLm1hcCgoeCkgPT4gKHsgaWQ6IHguaWQsIGxhYmVsOiB4Lm5hbWUgfSkgYXMgSUlkV2l0aExhYmVsKTtcblxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUV2ZW50RmllbGRzU3ViamVjdFxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiAoZGF0YSkgPT4gdGhpcy5wcm9jZXNzRXZlbnRGaWVsZHNTdWJqZWN0KGRhdGEpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnN0cnVjdG9yKFxuICAgIC8vICAgICBwcml2YXRlIGV2ZW50U3ZjOiBFdmVudFNlcnZpY2UsXG4gICAgLy8gICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIC8vICAgICBwcml2YXRlIGFwaVN2YzogQXphdmlzdGFBcGlTZXJ2aWNlLFxuICAgIC8vICAgICBwcml2YXRlIGFjbFN2YzogQWNsU2VydmljZSxcbiAgICAvLyAgICAgcHJpdmF0ZSByc1N2YzogUmVxdWlyZWRTY29wZXNTZXJ2aWNlLFxuICAgIC8vICAgICBwcml2YXRlIHNoYXJlZFN2YzogU2hhcmVkU2VydmljZSxcbiAgICAvLyAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25zU3ZjOiBOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICAvLyAgICAgcHJpdmF0ZSBjbXBTaGFyZWRTdmM6IEF6YXZpc3RhU2hhcmVkU2VydmljZSxcbiAgICAvLyAgICAgcHJpdmF0ZSByZWFkb25seSBwcm9jZXNzZXNTaGFyZWRTdmM6IFByb2Nlc3Nlc1NoYXJlZFNlcnZpY2UsXG4gICAgLy8gKSB7fVxuXG4gICAgLy8gYXN5bmMgbmdPbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gICAgIHRoaXMucHJvY2Vzc1R5cGUgPVxuICAgIC8vICAgICAgICAgdGhpcy5wcm9jZXNzVHlwZSB8fFxuICAgIC8vICAgICAgICAgKHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoXG4gICAgLy8gICAgICAgICAgICAgJ3R5cGUnLFxuICAgIC8vICAgICAgICAgKSBhcyBQcm9jZXNzVHlwZSkgfHxcbiAgICAvLyAgICAgICAgIFByb2Nlc3NUeXBlLmV2ZW50O1xuICAgIC8vICAgICBpZiAoIXRoaXMuZXZlbnQpIHtcbiAgICAvLyAgICAgICAgIHRoaXMuZXZlbnRTdmMuc2V0RXZlbnRJZFF1ZXJ5UGFyYW0odGhpcy5hY3RpdmF0ZWRSb3V0ZSk7XG4gICAgLy8gICAgICAgICB0aGlzLmV2ZW50ID0gdGhpcy5ldmVudFN2Yy5nZXRFdmVudCgpO1xuICAgIC8vICAgICAgICAgaWYgKCF0aGlzLmV2ZW50KSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZXZlbnRJZCA9XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoJ2V2ZW50SWQnKTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmV2ZW50ID0gYXdhaXQgdGhpcy5ldmVudFN2Yy5sb2FkRXZlbnQoZXZlbnRJZCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgaWYgKCF0aGlzLmZ1bGxQcm9jZXNzKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBwcm9jZXNzSWQgPVxuICAgIC8vICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoJ3Byb2Nlc3NJZCcpO1xuICAgIC8vICAgICAgICAgaWYgKHByb2Nlc3NJZCkge1xuICAgIC8vICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFByb2Nlc3MocHJvY2Vzc0lkKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIHRoaXMuY2hhbmdlRW1haWxGcm9tRmllbGRUb0VtYWlsRnJvbUV2ZW50RmllbGQoXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5mdWxsUHJvY2Vzcy5zdGVwcyxcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgY29uc3QgY2FtcGFpZ25zID0gYXdhaXQgdGhpcy5nZXRQdWJsaXNoZWRFbWFpbENhbXBhaWducygpO1xuICAgIC8vICAgICB0aGlzLmVtYWlsVGVtcGxhdGVzID0gY2FtcGFpZ25zLm1hcChcbiAgICAvLyAgICAgICAgICh4KSA9PiAoeyBpZDogeC5pZCwgbmFtZTogeC5uYW1lIH0pIGFzIEZsb3dCdWlsZGVyRW1haWxUZW1wbGF0ZSxcbiAgICAvLyAgICAgKTtcblxuICAgIC8vICAgICB0aGlzLmxhbmd1YWdlcyA9IGF3YWl0IHRoaXMuZ2V0TGFuZ3VhZ2VzKCk7XG4gICAgLy8gICAgIHRoaXMuZW1haWxDYW1wYWlnbnMgPSB0aGlzLmdldEVtYWlsQ2FtcGFpZ25zQXNJZFdpdGhMYWJlbChjYW1wYWlnbnMpO1xuXG4gICAgLy8gICAgIHRoaXMuaW50ZWdyYXRpb25zID0gYXdhaXQgdGhpcy5zaGFyZWRTdmMuZ2V0UGFydGlhbEludGVncmF0aW9ucygpO1xuICAgIC8vICAgICBjb25zdCBhbGxVc2VycyA9IGF3YWl0IHRoaXMuYXBpU3ZjLmdldEFsbFVzZXJzKCk7XG4gICAgLy8gICAgIHRoaXMuc2hhcmVkU3ZjLnNvcnRBbHBoYWJldGljYWxseShhbGxVc2VycywgKHgpID0+IHguZW1haWwpO1xuICAgIC8vICAgICB0aGlzLnVzZXJzID0gYWxsVXNlcnMubWFwKFxuICAgIC8vICAgICAgICAgKHgpID0+ICh7IGlkOiB4LmlkLCBsYWJlbDogeC5lbWFpbCB9KSBhcyBJTnVtZXJpY0lkV2l0aExhYmVsLFxuICAgIC8vICAgICApO1xuXG4gICAgLy8gICAgIGlmICh0aGlzLmV2ZW50LnR5cGUgPT09IEV2ZW50VHlwZS53b3JrZmxvdykge1xuICAgIC8vICAgICAgICAgY29uc3Qgc2VhcmNoVGVhbXNSZXF1ZXN0OiBJU2VhcmNoVGVhbXNSZXF1ZXN0ID0ge1xuICAgIC8vICAgICAgICAgICAgIGxpbWl0OiA1MCxcbiAgICAvLyAgICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgLy8gICAgICAgICB9O1xuICAgIC8vICAgICAgICAgc2VhcmNoVGVhbXNSZXF1ZXN0LmFkdmFuY2VkUXVlcnkgPVxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hhcmVkU3ZjLmNyZWF0ZUlkSW5TZWFyY2hQYXJhbXModGhpcy5ldmVudC50ZWFtX2lkcyk7XG4gICAgLy8gICAgICAgICBjb25zdCBzZWFyY2hUZWFtc1Jlc3BvbnNlID1cbiAgICAvLyAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwaVN2Yy5zZWFyY2hUZWFtcyhzZWFyY2hUZWFtc1JlcXVlc3QpO1xuICAgIC8vICAgICAgICAgdGhpcy53b3JrZmxvd1RlYW1zID0gc2VhcmNoVGVhbXNSZXNwb25zZS50ZWFtcy5tYXAoXG4gICAgLy8gICAgICAgICAgICAgKHgpID0+ICh7IGlkOiB4LmlkLCBsYWJlbDogeC5uYW1lIH0pIGFzIElOdW1lcmljSWRXaXRoTGFiZWwsXG4gICAgLy8gICAgICAgICApO1xuICAgIC8vICAgICAgICAgY29uc3QgYWxsVGVtcGxhdGVFdmVudHMgPSBhd2FpdCB0aGlzLmFwaVN2Yy5nZXRBbGxFdmVudHMoXG4gICAgLy8gICAgICAgICAgICAgRXZlbnRUeXBlLnRlbXBsYXRlLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgICAgIHRoaXMudGVtcGxhdGVFdmVudHMgPSBhbGxUZW1wbGF0ZUV2ZW50cy5tYXAoXG4gICAgLy8gICAgICAgICAgICAgKHgpID0+ICh7IGlkOiB4LmlkLCBsYWJlbDogeC5uYW1lIH0pIGFzIElJZFdpdGhMYWJlbCxcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhpcy5zdGFnZXMgPSBhd2FpdCB0aGlzLmFwaVN2Yy5nZXRBbGxTdGFnZXMoJ2V2ZW50JywgdGhpcy5ldmVudC5pZCk7XG5cbiAgICAvLyAgICAgdGhpcy5jcmVhdGVBY2xPYmplY3RzKCk7XG4gICAgLy8gICAgIGNvbnN0IGFsbEV2ZW50RmllbGRzID0gYXdhaXQgdGhpcy5hcGlTdmMuZ2V0QWxsRXZlbnRGaWVsZHMoXG4gICAgLy8gICAgICAgICB0aGlzLmV2ZW50LmlkLFxuICAgIC8vICAgICApO1xuICAgIC8vICAgICBjb25zdCBhbGxFdmVudFBhcnRpY2lwYW50RmllbGRzID1cbiAgICAvLyAgICAgICAgIGF3YWl0IHRoaXMuYXBpU3ZjLmdldEFsbEV2ZW50UGFydGljaXBhbnRGaWVsZHModGhpcy5ldmVudC5pZCk7XG4gICAgLy8gICAgIGNvbnN0IGFsbFByb2ZpbGVQYWdlcyA9IGF3YWl0IHRoaXMuc2hhcmVkU3ZjLmdldEFsbFByb2ZpbGVQYWdlcygpO1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnNoYXJlZFN2Yy5hZGRQcm9maWxlUGFnZUlkRmllbGQoXG4gICAgLy8gICAgICAgICBhbGxFdmVudFBhcnRpY2lwYW50RmllbGRzLFxuICAgIC8vICAgICAgICAgdHJ1ZSxcbiAgICAvLyAgICAgICAgIGFsbFByb2ZpbGVQYWdlcyxcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgICAgdGhpcy5zaGFyZWRTdmMuYWRkUGFydGljaXBhbnRTdGFnZUlkRmllbGQoXG4gICAgLy8gICAgICAgICBhbGxFdmVudFBhcnRpY2lwYW50RmllbGRzLFxuICAgIC8vICAgICAgICAgdGhpcy5zdGFnZXMsXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHRoaXMuZmllbGRzT3B0aW9ucyA9IFtdO1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnNoYXJlZFN2Yy5hZGRGaWVsZE9wdGlvbnNGb3JQcm9maWxlUGFnZUZpZWxkKFxuICAgIC8vICAgICAgICAgdGhpcy5maWVsZHNPcHRpb25zLFxuICAgIC8vICAgICAgICAgYWxsRXZlbnRQYXJ0aWNpcGFudEZpZWxkcyxcbiAgICAvLyAgICAgICAgIGFsbFByb2ZpbGVQYWdlcyxcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgICAgdGhpcy5zaGFyZWRTdmMuYWRkRmllbGRPcHRpb25zRm9yU3RhZ2VGaWVsZChcbiAgICAvLyAgICAgICAgIHRoaXMuc3RhZ2VzLFxuICAgIC8vICAgICAgICAgdGhpcy5maWVsZHNPcHRpb25zLFxuICAgIC8vICAgICApO1xuICAgIC8vICAgICBjb25zdCBldmVudEZpZWxkcyA9IHRoaXMucHJlcGFyZUZpZWxkcyhhbGxFdmVudEZpZWxkcyk7XG4gICAgLy8gICAgIHRoaXMuc2hhcmVkU3ZjLnNvcnRBbHBoYWJldGljYWxseShldmVudEZpZWxkcywgKGl0ZW0pID0+IGl0ZW0ubGFiZWwpO1xuICAgIC8vICAgICBjb25zdCBldmVudFBhcnRpY2lwYW50RmllbGRzID0gdGhpcy5wcmVwYXJlRmllbGRzKFxuICAgIC8vICAgICAgICAgYWxsRXZlbnRQYXJ0aWNpcGFudEZpZWxkcyxcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgICAgdGhpcy5zaGFyZWRTdmMuc29ydEFscGhhYmV0aWNhbGx5KFxuICAgIC8vICAgICAgICAgZXZlbnRQYXJ0aWNpcGFudEZpZWxkcyxcbiAgICAvLyAgICAgICAgIChpdGVtKSA9PiBpdGVtLmxhYmVsLFxuICAgIC8vICAgICApO1xuICAgIC8vICAgICBjb25zdCBhbGxFdmVudEFzc2V0cyA9IGF3YWl0IHRoaXMuYXBpU3ZjLmdldEFsbEV2ZW50QXNzZXRzKFxuICAgIC8vICAgICAgICAgdGhpcy5ldmVudC5pZCxcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgICAgdGhpcy5kb2N4RG9jdW1lbnRzID0gYWxsRXZlbnRBc3NldHNcbiAgICAvLyAgICAgICAgIC5maWx0ZXIoKHgpID0+IHguZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnLmRvY3gnKSlcbiAgICAvLyAgICAgICAgIC5tYXAoKHgpID0+ICh7IGlkOiB4LmlkLCBsYWJlbDogeC5uYW1lIH0pIGFzIElJZFdpdGhMYWJlbCk7XG4gICAgLy8gICAgIHRoaXMuZG9jdW1lbnRGaWVsZHMgPSBldmVudFBhcnRpY2lwYW50RmllbGRzXG4gICAgLy8gICAgICAgICAuZmlsdGVyKFxuICAgIC8vICAgICAgICAgICAgICh4KSA9PlxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmNtcFNoYXJlZFN2Yy5nZXRGaWVsZFR5cGVGcm9tRmllbGQoeCkgPT09ICdkb2N1bWVudCcsXG4gICAgLy8gICAgICAgICApXG4gICAgLy8gICAgICAgICAubWFwKCh4KSA9PiB4IGFzIElJZFdpdGhMYWJlbCk7XG5cbiAgICAvLyAgICAgdGhpcy5hZGROZXdDb25maWcgPSB0aGlzLmdldEFkZE5ld0NvbmZpZygpO1xuXG4gICAgLy8gICAgIHRoaXMuZmllbGRzID0gW1xuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGVudGl0eVR5cGVOYW1lOiBGbG93QnVpbGRlclN0ZXBFbnRpdHlUeXBlLmV2ZW50LFxuICAgIC8vICAgICAgICAgICAgIGZpZWxkczogZXZlbnRGaWVsZHMsXG4gICAgLy8gICAgICAgICAgICAgZXZlbnRGaWVsZHM6IGV2ZW50RmllbGRzLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBlbnRpdHlUeXBlTmFtZTogRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5wYXJ0aWNpcGFudCxcbiAgICAvLyAgICAgICAgICAgICBmaWVsZHM6IHRoaXMuc2hhcmVkU3ZjLmZpbHRlck91dFJlbGF0aW9uRmllbGRzKFxuICAgIC8vICAgICAgICAgICAgICAgICBldmVudFBhcnRpY2lwYW50RmllbGRzLFxuICAgIC8vICAgICAgICAgICAgICksXG4gICAgLy8gICAgICAgICAgICAgZXZlbnRGaWVsZHM6IGV2ZW50RmllbGRzLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgXTtcbiAgICAvLyAgICAgdGhpcy50ZW1wbGF0ZUV2ZW50RmllbGRzU3ViamVjdFxuICAgIC8vICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpXG4gICAgLy8gICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAvLyAgICAgICAgICAgICBuZXh0OiAoZGF0YSkgPT4gdGhpcy5wcm9jZXNzRXZlbnRGaWVsZHNTdWJqZWN0KGRhdGEpLFxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICBhc3luYyBwcm9jZXNzRXZlbnRGaWVsZHNTdWJqZWN0KFxuICAgICAgICBkYXRhOiBJVGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RNZXNzYWdlLFxuICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBkYXRhLnR5cGUgPT09IFRlbXBsYXRlRXZlbnRGaWVsZHNTdWJqZWN0TWVzc2FnZVR5cGUuZmllbGRzUmVxdWlyZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID1cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAgICAgICAgIGRhdGEuYm9keSBhcyBJVGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RGaWVsZHNSZXF1aXJlZE1lc3NhZ2VCb2R5O1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdGVyRmllbGRzID0gdGhpcy5maWVsZHM/LmZpbmQoXG4gICAgICAgICAgICAgICAgKHgpID0+XG4gICAgICAgICAgICAgICAgICAgIHguZW50aXR5VHlwZU5hbWUgPT09IEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUucGFydGljaXBhbnQsXG4gICAgICAgICAgICApPy5maWVsZHM7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUV2ZW50RmllbGRzID1cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29udHJvbGxlci5kYXRhUHJvdmlkZXI/LnByb2Nlc3NEYXRhU291cmNlQ2FsbGJhY2suZ2V0RXZlbnRGaWVsZHMoXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuZXZlbnRUZW1wbGF0ZUlkLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAgICAgY29uc3QgbXNnQm9keTogSVRlbXBsYXRlRXZlbnRGaWVsZHNTdWJqZWN0RmllbGRzQXZhaWxhYmxlTWVzc2FnZUJvZHkgPVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRGaWVsZHM6IHRlbXBsYXRlRXZlbnRGaWVsZHMgPz8gW10sXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RlckZpZWxkczogcmVxdWVzdGVyRmllbGRzID8/IFtdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFRlbXBsYXRlSWQ6IGJvZHkuZXZlbnRUZW1wbGF0ZUlkLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBib2R5LnN0ZXAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3QubmV4dCh7XG4gICAgICAgICAgICAgICAgdHlwZTogVGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RNZXNzYWdlVHlwZS5maWVsZHNBdmFpbGFibGUsXG4gICAgICAgICAgICAgICAgYm9keTogbXNnQm9keSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0RW1haWxDYW1wYWlnbnNBc0lkV2l0aExhYmVsKFxuICAgIC8vICAgICBjYW1wYWlnbnM6IElFbWFpbENhbXBhaWduW10sXG4gICAgLy8gKTogSUlkV2l0aExhYmVsW10ge1xuICAgIC8vICAgICByZXR1cm4gY2FtcGFpZ25zLm1hcChcbiAgICAvLyAgICAgICAgICh4KSA9PiAoeyBpZDogeC5pZCwgbGFiZWw6IHgubmFtZSB9KSBhcyBJSWRXaXRoTGFiZWwsXG4gICAgLy8gICAgICk7XG4gICAgLy8gfVxuXG4gICAgLy8gYXN5bmMgZ2V0UHVibGlzaGVkRW1haWxDYW1wYWlnbnMoKTogUHJvbWlzZTxJRW1haWxDYW1wYWlnbltdPiB7XG4gICAgLy8gICAgIGNvbnN0IHJlcSA9IHtcbiAgICAvLyAgICAgICAgIGV2ZW50SWQ6IHRoaXMuZXZlbnQuaWQsXG4gICAgLy8gICAgICAgICBsaW1pdDogNTAsXG4gICAgLy8gICAgICAgICBvZmZzZXQ6IDAsXG4gICAgLy8gICAgICAgICBzb3J0RmllbGROYW1lOiAnbmFtZScsXG4gICAgLy8gICAgICAgICBzb3J0RGlyZWN0aW9uOiAnYXNjJyxcbiAgICAvLyAgICAgfSBhcyBJU2VhcmNoRXZlbnRFbWFpbENhbXBhaWduc1JlcXVlc3Q7XG4gICAgLy8gICAgIGNvbnN0IHsgY2FtcGFpZ25zIH0gPSBhd2FpdCB0aGlzLmFwaVN2Yy5zZWFyY2hFdmVudEVtYWlsQ2FtcGFpZ25zKHJlcSk7XG4gICAgLy8gICAgIGNvbnN0IHB1Ymxpc2hlZENhbXBhaWduczogSUVtYWlsQ2FtcGFpZ25bXSA9IFtdO1xuICAgIC8vICAgICBjb25zdCBhbGxFbWFpbFRlbXBsYXRlcyA9IGF3YWl0IHRoaXMuYXBpU3ZjLmdldEFsbFBhZ2VzKFxuICAgIC8vICAgICAgICAgUGFnZVR5cGUuZW1haWxUZW1wbGF0ZSxcbiAgICAvLyAgICAgICAgIHRoaXMuZXZlbnQuaWQsXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIGxldCBlbWFpbFRlbXBsYXRlOiBJUGFnZTtcbiAgICAvLyAgICAgZm9yIChjb25zdCBjYW1wYWlnbiBvZiBjYW1wYWlnbnMpIHtcbiAgICAvLyAgICAgICAgIGVtYWlsVGVtcGxhdGUgPSBhbGxFbWFpbFRlbXBsYXRlcy5maW5kKFxuICAgIC8vICAgICAgICAgICAgICh0ZW1wbGF0ZSkgPT4gdGVtcGxhdGUuaWQgPT09IGNhbXBhaWduLmVtYWlsdGVtcGxhdGVfaWQsXG4gICAgLy8gICAgICAgICApO1xuICAgIC8vICAgICAgICAgZW1haWxUZW1wbGF0ZSAmJiBlbWFpbFRlbXBsYXRlLmlzX3B1Ymxpc2hlZFxuICAgIC8vICAgICAgICAgICAgID8gcHVibGlzaGVkQ2FtcGFpZ25zLnB1c2goY2FtcGFpZ24pXG4gICAgLy8gICAgICAgICAgICAgOiBudWxsO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBwdWJsaXNoZWRDYW1wYWlnbnM7XG4gICAgLy8gfVxuXG4gICAgLy8gYXN5bmMgZ2V0TGFuZ3VhZ2VzKCk6IFByb21pc2U8SUlkV2l0aExhYmVsW10+IHtcbiAgICAvLyAgICAgY29uc3QgZXZlbnRTZXR0aW5ncyA9IGF3YWl0IHRoaXMuYXBpU3ZjLmdldEV2ZW50U2V0dGluZ3ModGhpcy5ldmVudC5pZCk7XG4gICAgLy8gICAgIGNvbnN0IGFsbFN1cHBvcnRlZExhbmd1YWdlcyA9XG4gICAgLy8gICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFN2Yy5nZXRBbGxTdXBwb3J0ZWRJc29MYW5ndWFnZXMoKTtcbiAgICAvLyAgICAgY29uc3QgbGFuZ3VhZ2VzID0gdGhpcy5zaGFyZWRTdmMuZ2V0U2VsZWN0ZWRMYW5ndWFnZUl0ZW1zKFxuICAgIC8vICAgICAgICAgZXZlbnRTZXR0aW5ncy5zZXR0aW5ncy5sYW5ndWFnZXMsXG4gICAgLy8gICAgICAgICBhbGxTdXBwb3J0ZWRMYW5ndWFnZXMsXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHJldHVybiBsYW5ndWFnZXM7XG4gICAgLy8gfVxuXG4gICAgYXN5bmMgb25DaGFuZ2VzU2F2ZWQoc3RlcHM6IFN0ZXBbXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU29tZSBvZiB0aGUgcGFydGljaXBhbnQgZW50aXR5IHR5cGVzIGFuZCBzcGVjaWZpYyBhY3Rpb25zIHNob3VsZCBiZSBzZW50IGRpZmZlcmVudGx5IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlIGlmIGFjdGlvbiB0eXBlIGlzIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZW1haWxGcm9tRXZlbnRGaWVsZCBpdCBtdXN0IGJlIGNoYW5nZWQgdG9cbiAgICAgICAgICAgIC8vIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZW1haWxGcm9tRmllbGQgYW5kIHRoZSBmaWVsZC50eXBlIHRvIEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUuZXZlbnRcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRW1haWxGcm9tRXZlbnRGaWVsZFRvRW1haWxGcm9tRmllbGQoc3RlcHMpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZWNpc2lvbkNvbmZpZ3Moc3RlcHMpO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXBzU2F2ZWQuZW1pdChzdGVwcyk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBvbiByZWxvYWQgcHJvY2Vzc1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5hcGlTdmMuc2V0UHJvY2Vzc1N0ZXBzKHRoaXMuZnVsbFByb2Nlc3MuaWQsIHN0ZXBzKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMubG9hZFByb2Nlc3ModGhpcy5mdWxsUHJvY2Vzcy5pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF6Rmxvd0J1aWxkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF6Rmxvd0J1aWxkZXIuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRGVjaXNpb25Db25maWdzKHN0ZXBzOiBTdGVwW10pIHtcbiAgICAgICAgLy8gRGVjaXNpb25zIGZvciBwYXJ0aWNpcGFudHMgY2FuIGhhdmUgdHdvIHR5cGVzIGlmIHRoZSB1c2VyIHNlbGVjdHMgb25lIGFuZCB0aGUgb3RoZXJcbiAgICAgICAgLy8gVE9ETzogU2hvdWxkIHdlIG1vdmUgdGhpcyBsb2dpYyB0byB0aGUgY29tcG9uZW50cyBsaWJyYXJ5ID9cbiAgICAgICAgZm9yIChjb25zdCBzdGVwIG9mIHN0ZXBzKSB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGVwQW55ID0gc3RlcCBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoc3RlcC50eXBlID09PSBGbG93QnVpbGRlclN0ZXBUeXBlLmRlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlICdkZWNpc2lvbicgdHlwZSBzaG91bGQgbm90IGhhdmUgJ2NvbmZpZycgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgZGVsZXRlIChzdGVwIGFzIGFueSkuY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnR5cGUgPT09IEZsb3dCdWlsZGVyU3RlcFR5cGUuZGVjaXNpb25FeHRlcm5hbENSTSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSAnZGVjaXNpb25fZXh0ZXJuYWxjcm0nIHR5cGUgc2hvdWxkIG5vdCBoYXZlICdjb25kaXRpb24nIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSAoc3RlcCBhcyBhbnkpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZUVtYWlsRnJvbUV2ZW50RmllbGRUb0VtYWlsRnJvbUZpZWxkKHN0ZXBzOiBTdGVwW10pOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzdGVwIG9mIHN0ZXBzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGVwQW55ID0gc3RlcCBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RlcEFueS5jb25maWc/LmFjdGlvbiA9PT1cbiAgICAgICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLmVtYWlsRnJvbUV2ZW50RmllbGRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0ZXBBbnkuY29uZmlnLmFjdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZW1haWxGcm9tRmllbGQ7XG4gICAgICAgICAgICAgICAgc3RlcEFueS5jb25maWcuZmllbGQudHlwZSA9IEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUuZXZlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VFbWFpbEZyb21GaWVsZFRvRW1haWxGcm9tRXZlbnRGaWVsZChzdGVwczogU3RlcFtdKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3Qgc3RlcCBvZiBzdGVwcykge1xuICAgICAgICAgICAgY29uc3Qgc3RlcEFueSA9IHN0ZXAgYXMgYW55O1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHN0ZXBBbnkuY29uZmlnPy5hY3Rpb24gPT09XG4gICAgICAgICAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZW1haWxGcm9tRmllbGQgJiZcbiAgICAgICAgICAgICAgICBzdGVwQW55LmNvbmZpZy5maWVsZD8udHlwZSA9PT0gRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5ldmVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RlcEFueS5jb25maWcuYWN0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5lbWFpbEZyb21FdmVudEZpZWxkO1xuICAgICAgICAgICAgICAgIHN0ZXBBbnkuY29uZmlnLmZpZWxkLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBFbnRpdHlUeXBlLnBhcnRpY2lwYW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlQWNsT2JqZWN0cygpOiB2b2lkIHtcbiAgICAvLyAgICAgY29uc3QgZXZlbnRUZWFtSWRzID0gdGhpcy5ldmVudC50ZWFtX2lkcztcbiAgICAvLyAgICAgaWYgKHRoaXMucHJvY2Vzc1R5cGUgPT09IFByb2Nlc3NUeXBlLmV2ZW50KSB7XG4gICAgLy8gICAgICAgICB0aGlzLmNhbkVkaXRTdGVwc0FjbCA9IHRoaXMuYWNsU3ZjLmdldEFjbE9iamVjdChcbiAgICAvLyAgICAgICAgICAgICBldmVudFRlYW1JZHMsXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yc1N2Yy5nZXRQcm9jZXNzU2NvcGVzQ2FuVXBkYXRlRXZlbnQoKSxcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gICAgICAgICB0aGlzLmNhbkVkaXRQYXVzZWRBY2wgPSB0aGlzLmFjbFN2Yy5nZXRBY2xPYmplY3QoXG4gICAgLy8gICAgICAgICAgICAgZXZlbnRUZWFtSWRzLFxuICAgIC8vICAgICAgICAgICAgIHRoaXMucnNTdmMuZ2V0UHJvY2Vzc1Njb3Blc0NhblBhdXNlRXZlbnQoKSxcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gICAgICAgICB0aGlzLmNhbkludGVycnVwdEFjbCA9IHRoaXMuYWNsU3ZjLmdldEFjbE9iamVjdChcbiAgICAvLyAgICAgICAgICAgICBldmVudFRlYW1JZHMsXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yc1N2Yy5nZXRQcm9jZXNzU2NvcGVzQ2FuSW50ZXJydXB0RXZlbnQoKSxcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAodGhpcy5wcm9jZXNzVHlwZSA9PT0gUHJvY2Vzc1R5cGUucGFydGljaXBhbnQpIHtcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuRWRpdFN0ZXBzQWNsID0gdGhpcy5hY2xTdmMuZ2V0QWNsT2JqZWN0KFxuICAgIC8vICAgICAgICAgICAgIGV2ZW50VGVhbUlkcyxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJzU3ZjLmdldFByb2Nlc3NTY29wZXNDYW5VcGRhdGVQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuRWRpdFBhdXNlZEFjbCA9IHRoaXMuYWNsU3ZjLmdldEFjbE9iamVjdChcbiAgICAvLyAgICAgICAgICAgICBldmVudFRlYW1JZHMsXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yc1N2Yy5nZXRQcm9jZXNzU2NvcGVzQ2FuUGF1c2VQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuSW50ZXJydXB0QWNsID0gdGhpcy5hY2xTdmMuZ2V0QWNsT2JqZWN0KFxuICAgIC8vICAgICAgICAgICAgIGV2ZW50VGVhbUlkcyxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJzU3ZjLmdldFByb2Nlc3NTY29wZXNDYW5JbnRlcnJ1cHRQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgfSBlbHNlIGlmICh0aGlzLnByb2Nlc3NUeXBlID09PSBQcm9jZXNzVHlwZS5ib29raW5nKSB7XG4gICAgLy8gICAgICAgICAvLyBUT0RPOiBTY29wZXNcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuRWRpdFN0ZXBzQWNsID0gdGhpcy5hY2xTdmMuZ2V0QWNsT2JqZWN0KFxuICAgIC8vICAgICAgICAgICAgIGV2ZW50VGVhbUlkcyxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJzU3ZjLmdldFByb2Nlc3NTY29wZXNDYW5VcGRhdGVQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuRWRpdFBhdXNlZEFjbCA9IHRoaXMuYWNsU3ZjLmdldEFjbE9iamVjdChcbiAgICAvLyAgICAgICAgICAgICBldmVudFRlYW1JZHMsXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yc1N2Yy5nZXRQcm9jZXNzU2NvcGVzQ2FuUGF1c2VQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgICAgIHRoaXMuY2FuSW50ZXJydXB0QWNsID0gdGhpcy5hY2xTdmMuZ2V0QWNsT2JqZWN0KFxuICAgIC8vICAgICAgICAgICAgIGV2ZW50VGVhbUlkcyxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJzU3ZjLmdldFByb2Nlc3NTY29wZXNDYW5JbnRlcnJ1cHRQYXJ0aWNpcGFudCgpLFxuICAgIC8vICAgICAgICAgKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBhc3luYyBsb2FkUHJvY2Vzcyhwcm9jZXNzSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgcmVsb2FkIHByb2Nlc3NcbiAgICAgICAgLy8gdGhpcy5mdWxsUHJvY2VzcyA9IGF3YWl0IHRoaXMuYXBpU3ZjLmdldFByb2Nlc3MocHJvY2Vzc0lkKTtcbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VFbWFpbEZyb21GaWVsZFRvRW1haWxGcm9tRXZlbnRGaWVsZCh0aGlzLmZ1bGxQcm9jZXNzLnN0ZXBzKTtcbiAgICB9XG5cbiAgICAvLyBwcmVwYXJlRmllbGRzKGZpZWxkczogSUZpZWxkW10pOiBJRmllbGRbXSB7XG4gICAgLy8gICAgIGlmICghZmllbGRzKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gW107XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIGZpZWxkc1xuICAgIC8vICAgICAgICAgLmZpbHRlcigoeCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHRoaXMuY21wU2hhcmVkU3ZjLmdldEZpZWxkVHlwZUZyb21GaWVsZCh4KTtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmllbGRUeXBlICE9PSAndmlydHVhbC1yZWxhdGlvbic7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLm1hcCgoeCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgIHguZWRpdGFibGUgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiB4O1xuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgZ2V0QXZhaWxhYmxlU3RlcFR5cGVzKCk6IEZsb3dCdWlsZGVyU3RlcFR5cGVbXSB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVN0ZXBUeXBlczogRmxvd0J1aWxkZXJTdGVwVHlwZVtdID0gW1xuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwVHlwZS53YWl0LFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwVHlwZS53YWl0VW50aWxGaWVsZCxcbiAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcFR5cGUuYWN0aW9uLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCB1cGRhdGVMaWdodEFjbCA9IHRoaXMuZ2V0QWNsT2JqZWN0Rm9yQ3VycmVudFVzZXI/LigpO1xuICAgICAgICBpZiAodXBkYXRlTGlnaHRBY2w/LmFsbG93ZWQpIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVN0ZXBUeXBlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC4uLltcbiAgICAgICAgICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwVHlwZS5kZWNpc2lvbixcbiAgICAgICAgICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwVHlwZS5kZWNpc2lvbkV4dGVybmFsQ1JNLFxuICAgICAgICAgICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBUeXBlLmRlY2lzaW9uTm93LFxuICAgICAgICAgICAgICAgICAgICAvLyBGbG93QnVpbGRlclN0ZXBUeXBlLnN0YWdlQ2hhbmdlLCAvLyBUT0RPOiBzaG91bGQgYmUgZW5hYmxlZCB3aGVuIHRoZSBzdGFnZS93b3JrZmxvdyhzKSBhcmUgcHJvdmlkZWRcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlU3RlcFR5cGVzO1xuICAgIH1cblxuICAgIGdldEFkZE5ld0NvbmZpZygpOiBGbG93QnVpbGRlckFkZE5ld0NvbmZpZyB7XG4gICAgICAgIC8vIGNvbnN0IGV2ZW50QWN0aW9uczogRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZVtdID0gW1xuICAgICAgICAvLyAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5lbWFpbEZyb21GaWVsZCxcbiAgICAgICAgLy8gICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2VuZFdlYmhvb2tcbiAgICAgICAgLy8gXTtcbiAgICAgICAgY29uc3QgZXZlbnRBY3Rpb25zOiBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlW10gPSBbXG4gICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLnNldEZpZWxkLFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5hZGRUZWFtLFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5yZW1vdmVUZWFtLFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5zZXREYXRlVGltZUZpZWxkVG9DdXJyZW50LFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5zZW5kV2ViaG9vayxcbiAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2VuZEdlbmVyaWNFbWFpbCxcbiAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2V0UmVmZXJlbmNlTnVtYmVyLFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5zZW5kT2JqZWN0LFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5jb3B5RXZlbnREYXRlcyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnRBY3Rpb25zOiBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlW10gPSBbXG4gICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLnNldEZpZWxkLFxuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5lbWFpbCxcbiAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2V0RGF0ZVRpbWVGaWVsZFRvQ3VycmVudCxcbiAgICAgICAgICAgIEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZ2VuZXJhdGVDZXJ0aWZpY2F0ZSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBib29raW5nQWN0aW9uczogRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZVtdID0gW1xuICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5zZW5kV2ViaG9vayxcbiAgICAgICAgXTtcblxuICAgICAgICBpZiAodGhpcy5ldmVudD8udHlwZSA9PT0gRXZlbnRUeXBlLndvcmtmbG93KSB7XG4gICAgICAgICAgICAvLyBBZGQgdHdvIG1vcmUgcGFydGljaXBhbnQgYWN0aW9uIHR5cGVzXG4gICAgICAgICAgICBwYXJ0aWNpcGFudEFjdGlvbnMucHVzaChGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLmFkZFRlYW0pO1xuICAgICAgICAgICAgcGFydGljaXBhbnRBY3Rpb25zLnB1c2goRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5yZW1vdmVUZWFtKTtcbiAgICAgICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuY3JlYXRlRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZ2VuZXJhbEVtYWlsKTtcbiAgICAgICAgcGFydGljaXBhbnRBY3Rpb25zLnB1c2goRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5lbWFpbEZyb21GaWVsZCk7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuZW1haWxGcm9tRXZlbnRGaWVsZCk7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2VuZFdlYmhvb2spO1xuICAgICAgICBwYXJ0aWNpcGFudEFjdGlvbnMucHVzaChGbG93QnVpbGRlclN0ZXBBY3Rpb25UeXBlLnNldFJlZmVyZW5jZU51bWJlcik7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2VuZE9iamVjdCk7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuY291bnRTZWxlY3RGaWVsZCk7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuY29weUV2ZW50VGV4dEZpZWxkKTtcbiAgICAgICAgcGFydGljaXBhbnRBY3Rpb25zLnB1c2goRmxvd0J1aWxkZXJTdGVwQWN0aW9uVHlwZS5tZXNzYWdlVG9QYXJ0aWNpcGFudCk7XG4gICAgICAgIHBhcnRpY2lwYW50QWN0aW9ucy5wdXNoKEZsb3dCdWlsZGVyU3RlcEFjdGlvblR5cGUuc2VuZE1lc3NhZ2VUb1VzZXIpO1xuXG4gICAgICAgIGxldCBhdmFpbGFibGVFbnRpdHlUeXBlTmFtZXM6IEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGVbXTtcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc1R5cGUgPT09IFByb2Nlc3NUeXBlLmV2ZW50KSB7XG4gICAgICAgICAgICBhdmFpbGFibGVFbnRpdHlUeXBlTmFtZXMgPSBbRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5ldmVudF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdmFpbGFibGVFbnRpdHlUeXBlTmFtZXMgPSBbXG4gICAgICAgICAgICAgICAgRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5wYXJ0aWNpcGFudCxcbiAgICAgICAgICAgICAgICBGbG93QnVpbGRlclN0ZXBFbnRpdHlUeXBlLmV2ZW50LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhZGROZXdDb25maWcgPSB7XG4gICAgICAgICAgICBhdmFpbGFibGVTdGVwVHlwZXM6IHRoaXMuZ2V0QXZhaWxhYmxlU3RlcFR5cGVzKCksXG4gICAgICAgICAgICBkZWNpc2lvblN0ZXBDb25maWc6IHtcbiAgICAgICAgICAgICAgICBlbnRpdHlUeXBlTmFtZXM6IGF2YWlsYWJsZUVudGl0eVR5cGVOYW1lcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3Rpb25TdGVwQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgZW50aXR5VHlwZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZW50aXR5VHlwZU5hbWU6IEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUucGFydGljaXBhbnQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpb25zOiBwYXJ0aWNpcGFudEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZW50aXR5VHlwZU5hbWU6IEZsb3dCdWlsZGVyU3RlcEVudGl0eVR5cGUuZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBhY3Rpb25zOiBldmVudEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9IGFzIEZsb3dCdWlsZGVyQWRkTmV3Q29uZmlnO1xuICAgICAgICBpZiAodGhpcy5wcm9jZXNzVHlwZSA9PT0gUHJvY2Vzc1R5cGUucGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgIGFkZE5ld0NvbmZpZy5hY3Rpb25TdGVwQ29uZmlnPy5lbnRpdHlUeXBlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbnRpdHlUeXBlTmFtZTogRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5wYXJ0aWNpcGFudCxcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBwYXJ0aWNpcGFudEFjdGlvbnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb2Nlc3NUeXBlID09PSBQcm9jZXNzVHlwZS5ldmVudCkge1xuICAgICAgICAgICAgYWRkTmV3Q29uZmlnLmFjdGlvblN0ZXBDb25maWc/LmVudGl0eVR5cGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVudGl0eVR5cGVOYW1lOiBGbG93QnVpbGRlclN0ZXBFbnRpdHlUeXBlLmV2ZW50LFxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IGV2ZW50QWN0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvY2Vzc1R5cGUgPT09IFByb2Nlc3NUeXBlLmJvb2tpbmcpIHtcbiAgICAgICAgICAgIGFkZE5ld0NvbmZpZy5hY3Rpb25TdGVwQ29uZmlnPy5lbnRpdHlUeXBlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbnRpdHlUeXBlTmFtZTogRmxvd0J1aWxkZXJTdGVwRW50aXR5VHlwZS5ib29raW5nLFxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IGJvb2tpbmdBY3Rpb25zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZE5ld0NvbmZpZztcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgYXN5bmMgb25GbG93UGF1c2VkQ2hhbmdlZChwYXVzZWQ6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gVE9ETzogb24gZmxvdyBwYXVzZVxuICAgICAgICAvLyBhd2FpdCB0aGlzLnByb2Nlc3Nlc1NoYXJlZFN2Yy5vbkZsb3dQYXVzZWRDaGFuZ2VkKFxuICAgICAgICAvLyAgICAgcGF1c2VkLFxuICAgICAgICAvLyAgICAgdGhpcy5mdWxsUHJvY2VzcyxcbiAgICAgICAgLy8gKTtcbiAgICB9XG5cbiAgICBhc3luYyBvbkZsb3dJbnRlcnJ1cHRlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY29uZmlybVJlc3VsdCA9IGF3YWl0IHRoaXMuc2hvd1Byb2Nlc3NJbnRlcnJ1cHRpb25Db25maXJtYXRpb24oKTtcbiAgICAgICAgaWYgKCFjb25maXJtUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IG9uRmxvd0ludGVycnVwdGVkXG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLmFwaVN2Yy5pbnRlcnJ1cHRQcm9jZXNzKHRoaXMuZnVsbFByb2Nlc3MuaWQpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5sb2FkUHJvY2Vzcyh0aGlzLmZ1bGxQcm9jZXNzLmlkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyogZW1wdHkgKi9cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgYXN5bmMgc2hvd1Byb2Nlc3NJbnRlcnJ1cHRpb25Db25maXJtYXRpb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyBUT0RPOiBjcmVhdGUgY29uZmlybWF0aW9uXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmNtcFNoYXJlZFN2Yy5zaG93Q29uZmlybWF0aW9uRGlhbG9nKFxuICAgICAgICAvLyAgICAgdGhpcy5jbXBTaGFyZWRTdmMudHJhbnNsYXRlKFRyYW5zbGF0aW9uS2V5LmludGVycnVwdFdvcmtmbG93KSxcbiAgICAgICAgLy8gICAgIFtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNtcFNoYXJlZFN2Yy50cmFuc2xhdGUoXG4gICAgICAgIC8vICAgICAgICAgICAgIFRyYW5zbGF0aW9uS2V5LmludGVycnVwdFdvcmtmbG93RGlhbG9nQXJlWW91U3VyZSxcbiAgICAgICAgLy8gICAgICAgICApLFxuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gKTtcbiAgICB9XG5cbiAgICBvbk5vdENvbmZpZ3VyZWQoKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IHRoaXMuY21wU2hhcmVkU3ZjLnRyYW5zbGF0ZSgnUFJPQ0VTU19TVEVQU19OT1RfQ09ORklHVVJFRCcpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNTdmMuc2hvd01lc3NhZ2UoTm90aWZpY2F0aW9uTWVzc2FnZVR5cGUud2FybmluZywgbXNnKTtcbiAgICB9XG5cbiAgICAvLyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcbiAgICAvLyAgICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gICAgLy8gfVxuXG4gICAgZ2V0U2VsZWN0ZWRMYW5ndWFnZUl0ZW1zKFxuICAgICAgICBzZWxlY3RlZElkczogc3RyaW5nW10sXG4gICAgICAgIGxhbmd1YWdlSXRlbXM6IElMYW5ndWFnZUl0ZW1bXSxcbiAgICApOiBJTGFuZ3VhZ2VJdGVtW10ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zOiBJTGFuZ3VhZ2VJdGVtW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBldmVudExhbmcgb2Ygc2VsZWN0ZWRJZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzb0xhbmcgPSBsYW5ndWFnZUl0ZW1zLmZpbmQoKHgpID0+IHguaWQgPT09IGV2ZW50TGFuZyk7XG4gICAgICAgICAgICBpZiAoaXNvTGFuZykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpc29MYW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICB9XG59XG4iLCI8YXphdmlzdGEtZmxvdy1idWlsZGVyXHJcbiAgICAqbmdJZj1cImxvYWRlZFwiXHJcbiAgICBbc3RlcHNdPVwiZnVsbFByb2Nlc3M/LnN0ZXBzID8/IFtdXCJcclxuICAgIFt0aXRsZV09XCJmdWxsUHJvY2Vzcz8ubmFtZSA/PyAnJ1wiXHJcbiAgICBbY2FuRWRpdFN0ZXBzXT1cInRydWVcIlxyXG4gICAgW2NhbkVkaXRTdGF0dXNdPVwiZmFsc2VcIlxyXG4gICAgW2Zsb3dQYXVzZWRdPVwiISFmdWxsUHJvY2Vzcz8ucGF1c2VkXCJcclxuICAgIFthZGROZXdDb25maWddPVwiJGFueShhZGROZXdDb25maWcpXCJcclxuICAgIFtlbWFpbFRlbXBsYXRlc109XCJlbWFpbFRlbXBsYXRlcyA/PyBbXVwiXHJcbiAgICBbdGVhbXNdPVwid29ya2Zsb3dUZWFtcyA/PyBbXVwiXHJcbiAgICBbZW1haWxDYW1wYWlnbnNdPVwiZW1haWxDYW1wYWlnbnMgPz8gW11cIlxyXG4gICAgW2ludGVncmF0aW9uc109XCIkYW55KGludGVncmF0aW9ucykgPz8gW11cIlxyXG4gICAgW3VzZXJzXT1cInVzZXJzID8/IFtdXCJcclxuICAgIFtsYW5ndWFnZXNdPVwibGFuZ3VhZ2VzID8/IFtdXCJcclxuICAgIFt0ZW1wbGF0ZUV2ZW50c109XCJ0ZW1wbGF0ZUV2ZW50cyA/PyBbXVwiXHJcbiAgICBbdGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RdPVwidGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RcIlxyXG4gICAgW3N0YWdlc109XCJzdGFnZXMgXCJcclxuICAgIFtmaWVsZHNdPVwiZmllbGRzID8/IFtdXCJcclxuICAgIFtmaWVsZHNPcHRpb25zXT1cImZpZWxkc09wdGlvbnNcIlxyXG4gICAgW2RvY3hEb2N1bWVudHNdPVwiZG9jeERvY3VtZW50cyA/PyBbXVwiXHJcbiAgICBbZG9jdW1lbnRGaWVsZHNdPVwiZG9jdW1lbnRGaWVsZHMgPz8gW11cIlxyXG4gICAgKGNoYW5nZXNTYXZlZCk9XCJvbkNoYW5nZXNTYXZlZCgkZXZlbnQpXCJcclxuICAgIChub3RDb25maWd1cmVkKT1cIm9uTm90Q29uZmlndXJlZCgpXCJcclxuICAgIChmbG93UGF1c2VkQ2hhbmdlZCk9XCJvbkZsb3dQYXVzZWRDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgKGZsb3dJbnRlcnJ1cHRlZCk9XCJvbkZsb3dJbnRlcnJ1cHRlZCgpXCJcclxuPjwvYXphdmlzdGEtZmxvdy1idWlsZGVyPlxyXG5cclxuXHJcbjwhLS0gPGF6YXZpc3RhLWZsb3ctYnVpbGRlclxyXG4gICAgKm5nSWY9XCJsb2FkZWRcIlxyXG4gICAgW2NhbkVkaXRTdGVwc0FjbF09XCJjYW5FZGl0U3RlcHNBY2xcIlxyXG4gICAgW2NhbkVkaXRQYXVzZWRBY2xdPVwiY2FuRWRpdFBhdXNlZEFjbFwiXHJcbiAgICBbY2FuSW50ZXJydXB0QWNsXT1cImNhbkludGVycnVwdEFjbFwiXHJcbiAgICBbc3RlcHNdPVwiZnVsbFByb2Nlc3M/LnN0ZXBzXCJcclxuICAgIFt0aXRsZV09XCJmdWxsUHJvY2Vzcz8ubmFtZVwiXHJcbiAgICBbY2FuRWRpdFN0ZXBzXT1cInRydWVcIlxyXG4gICAgW2NhbkVkaXRTdGF0dXNdPVwidHJ1ZVwiXHJcbiAgICBbZmxvd1BhdXNlZF09XCJmdWxsUHJvY2Vzcz8ucGF1c2VkXCJcclxuICAgIFthZGROZXdDb25maWddPVwiYWRkTmV3Q29uZmlnXCJcclxuICAgIFtlbWFpbFRlbXBsYXRlc109XCJlbWFpbFRlbXBsYXRlc1wiXHJcbiAgICBbdGVhbXNdPVwid29ya2Zsb3dUZWFtc1wiXHJcbiAgICBbZW1haWxDYW1wYWlnbnNdPVwiZW1haWxDYW1wYWlnbnNcIlxyXG4gICAgW2ludGVncmF0aW9uc109XCJpbnRlZ3JhdGlvbnNcIlxyXG4gICAgW3VzZXJzXT1cInVzZXJzXCJcclxuICAgIFtsYW5ndWFnZXNdPVwibGFuZ3VhZ2VzXCJcclxuICAgIFt0ZW1wbGF0ZUV2ZW50c109XCJ0ZW1wbGF0ZUV2ZW50c1wiXHJcbiAgICBbdGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RdPVwidGVtcGxhdGVFdmVudEZpZWxkc1N1YmplY3RcIlxyXG4gICAgW3N0YWdlc109XCJzdGFnZXNcIlxyXG4gICAgW2ZpZWxkc109XCJmaWVsZHNcIlxyXG4gICAgW2ZpZWxkc09wdGlvbnNdPVwiZmllbGRzT3B0aW9uc1wiXHJcbiAgICBbZG9jeERvY3VtZW50c109XCJkb2N4RG9jdW1lbnRzXCJcclxuICAgIFtkb2N1bWVudEZpZWxkc109XCJkb2N1bWVudEZpZWxkc1wiXHJcbiAgICAoY2hhbmdlc1NhdmVkKT1cIm9uQ2hhbmdlc1NhdmVkKCRldmVudClcIlxyXG4gICAgKG5vdENvbmZpZ3VyZWQpPVwib25Ob3RDb25maWd1cmVkKClcIlxyXG4gICAgKGZsb3dQYXVzZWRDaGFuZ2VkKT1cIm9uRmxvd1BhdXNlZENoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAoZmxvd0ludGVycnVwdGVkKT1cIm9uRmxvd0ludGVycnVwdGVkKClcIlxyXG4+PC9hemF2aXN0YS1mbG93LWJ1aWxkZXI+IC0tPlxyXG4iXX0=