import { OutputPin, InputPin, WorkflowType } from '@azavista/workflow-builder-shared';
import * as i5$2 from '@syncfusion/ej2-angular-diagrams';
import { ConnectorConstraints, PortVisibility, PortConstraints, NodeConstraints, DiagramConstraints, SnapConstraints, DiagramTools, Node, Connector, DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { getCanvasWorkflow } from '@azavista/workflow-builder-shared/lib/factory';
import * as i2 from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i0 from '@angular/core';
import { Injectable, Pipe, EventEmitter, Component, Input, Output, ViewChild, Inject, ChangeDetectionStrategy, HostBinding, HostListener, ViewChildren, NgModule } from '@angular/core';
import { BehaviorSubject, firstValueFrom, filter, map, of, debounceTime, Subject, takeUntil, startWith } from 'rxjs';
import { flatSearchToRecursive } from '@azavista/advanced-search';
import { CrmStatus } from '@azavista/azavista-types';
import * as i1 from '@azavista/servicelib';
import { AzavistaServicelibModule } from '@azavista/servicelib';
import * as i3 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i3$1 from 'ng-resize-observer';
import { ngResizeObserverProviders } from 'ng-resize-observer';
import * as i1$1 from '@azavista/components/shared';
import { omit as omit$1 } from '@azavista/components/shared';
import { AzavistaGroupedFieldsComponent } from '@azavista/components/grouped-fields';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i7 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i8 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i8$2 from '@azavista/components/button';
import { AzavistaButtonModule } from '@azavista/components/button';
import * as i5$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i4 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i6 from '@angular/cdk/text-field';
import * as i7$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i8$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i9 from '@angular/material/core';
import * as i10 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i2$1 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i1$2 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i4$1 from '@azavista/components/flow-builder';
import { FlowBuilderStepEntityType, FlowBuilderStepType, FlowBuilderStepActionType, AzavistaFlowBuilderComponent, AzavistaFlowBuilderModule } from '@azavista/components/flow-builder';
import * as i8$3 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

const PREFIX_NODE = 'node_';
const PREFIX_PORT = 'port_';
const PREFIX_CONNECTOR = 'connector_';
const DEFAULT_NODE_WIDTH = 250;
const DEFAULT_NODE_HEIGHT = 150;
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_STROKE_COLOR = '#aaa';
const DEFAULT_SELECTED_STROKE_COLOR = 'blue';
const DEFAULT_ERROR_STROKE_COLOR = '#f00';
const DEFAULT_CONNECTOR = {
    cornerRadius: 8,
    allowNodeOverlap: false,
    type: 'Orthogonal',
    segments: [{ type: 'Orthogonal' }],
    style: {
        strokeColor: DEFAULT_STROKE_COLOR,
        strokeWidth: DEFAULT_STROKE_WIDTH,
        fill: DEFAULT_STROKE_COLOR,
    },
    targetDecorator: {
        style: {
            fill: DEFAULT_STROKE_COLOR,
            strokeColor: DEFAULT_STROKE_COLOR,
            strokeWidth: DEFAULT_STROKE_WIDTH,
        },
        pivot: {
            x: -0.3,
        },
    },
    sourcePortID: 'port__output_pin',
    targetPortID: 'port__input_pin',
    // margin: {
    //     right: DEFAULT_PIN_SIZE * 2,
    //     bottom: DEFAULT_PIN_SIZE * 2,
    //     left: DEFAULT_PIN_SIZE * 2,
    //     top: DEFAULT_PIN_SIZE * 2,
    // },
};
const OUTPUT_PIN_PAIR = {
    [OutputPin.OUTPUT]: InputPin.INPUT,
    [OutputPin.CANCELLATION_OUTPUT]: InputPin.CANCELLATION_INPUT,
    [OutputPin.DECLINE_OUTPUT]: InputPin.DECLINE_INPUT,
    [OutputPin.EXISTING_CONTACT]: InputPin.INPUT,
    [OutputPin.INVITED_CONTACT]: InputPin.INPUT,
    [OutputPin.NEW_CONTACT]: InputPin.INPUT,
};
const WORKFLOW_NAME_TRANSLATIONS = {
    [WorkflowType.ARRIVAL]: 'ARRIVAL_WORKFLOW_NAME',
    [WorkflowType.CANCELLATION]: 'CANCELLATION_WORKFLOW_NAME',
    [WorkflowType.EVENT_CANCELLATION]: 'EVENT_CANCELLATION_WORKFLOW_NAME',
    [WorkflowType.INVITATION]: 'INVITATION_WORKFLOW_NAME',
    [WorkflowType.MULTI_REGISTRATION]: 'MULTI_REGISTRATION_WORKFLOW_NAME',
    [WorkflowType.PAYMENT]: 'PAYMENT_WORKFLOW_NAME',
    [WorkflowType.PAYMENT_WAITINGLIST]: 'PAYMENT_WAITINGLIST_WORKFLOW_NAME',
    [WorkflowType.PRE_ARRIVAL]: 'PRE_ARRIVAL_WORKFLOW_NAME',
    [WorkflowType.PROFILE]: 'PROFILE_WORKFLOW_NAME',
    [WorkflowType.PUBLIC_REGISTRATION]: 'PUBLIC_REGISTRATION_WORKFLOW_NAME',
    [WorkflowType.REGISTRATION]: 'REGISTRATION_WORKFLOW_NAME',
    [WorkflowType.REGISTRAION_WAITINGLIST]: 'REGISTRATION_WAITINGLIST_WORKFLOW_NAME',
    [WorkflowType.STAGE_ACTION]: 'STAGE_ACTION_WORKFLOW_NAME',
    [WorkflowType.DECLINE]: 'DECLINE_WORKFLOW_NAME',
    [WorkflowType.PUBLIC_REGISTRATION_AND_MEMBERSHIP]: 'PUBLIC_REGISTRATION_AND_MEMBERSHIP_WORKFLOW_NAME',
    [WorkflowType.WAITINGLIST]: 'WAITING_LIST_WORKFLOW_NAME',
    'create-work-block': 'CREATE_WORKBLOCK_NAME',
};
const WORKFLOW_EXPLANATION_TRANSLATIONS = {
    [WorkflowType.ARRIVAL]: 'ARRIVAL_WORKFLOW_EXPLANATION',
    [WorkflowType.CANCELLATION]: 'CANCELLATION_WORKFLOW_EXPLANATION',
    [WorkflowType.EVENT_CANCELLATION]: 'EVENT_CANCELLATION_WORKFLOW_EXPLANATION',
    [WorkflowType.INVITATION]: 'INVITATION_WORKFLOW_EXPLANATION',
    [WorkflowType.MULTI_REGISTRATION]: 'MULTI_REGISTRATION_WORKFLOW_EXPLANATION',
    [WorkflowType.PAYMENT]: 'PAYMENT_WORKFLOW_EXPLANATION',
    [WorkflowType.PAYMENT_WAITINGLIST]: 'PAYMENT_WAITING_LIST_WORKFLOW_EXPLANATION',
    [WorkflowType.PRE_ARRIVAL]: 'PRE_ARRIVAL_WORKFLOW_EXPLANATION',
    [WorkflowType.PROFILE]: 'PROFILE_WORKFLOW_EXPLANATION',
    [WorkflowType.PUBLIC_REGISTRATION]: 'PUBLIC_REGISTRATION_WORKFLOW_EXPLANATION',
    [WorkflowType.REGISTRATION]: 'REGISTRATION_WORKFLOW_EXPLANATION',
    [WorkflowType.REGISTRAION_WAITINGLIST]: 'REGISTRATION_WAITING_LIST_WORKFLOW_EXPLANATION',
    [WorkflowType.STAGE_ACTION]: 'STAGE_ACTION_WORKFLOW_EXPLANATION',
    [WorkflowType.DECLINE]: 'DECLINE_WORKFLOW_EXPLANATION',
    [WorkflowType.PUBLIC_REGISTRATION_AND_MEMBERSHIP]: 'PUBLIC_REGISTRATION_AND_MEMBERSHIP_WORKFLOW_EXPLANATION',
    [WorkflowType.WAITINGLIST]: 'WAITING_LIST_WORKFLOW_EXPLANATION',
};
// TODO: Remove this when we have API endpoint with constants
const ISO_LANGUAGES = [
    { id: 'en-US', label: 'English (United States)' },
    { id: 'en-GB', label: 'English (Great Britain)' },
    { id: 'de-DE', label: 'German' },
    { id: 'nl-NL', label: 'Dutch' },
    { id: 'fr-FR', label: 'French' },
    { id: 'es-ES', label: 'Spanish' },
    { id: 'ca-ES', label: 'Catalan (Spain)' },
    { id: 'da-DK', label: 'Danish' },
    { id: 'it-IT', label: 'Italian' },
    { id: 'pt-PT', label: 'Portuguese' },
    { id: 'pt-BR', label: 'Portuguese (Brazilizan)' },
    { id: 'sv-SE', label: 'Swedish' },
    { id: 'cs-CZ', label: 'Czech' },
    { id: 'el-GR', label: 'Greek' },
    { id: 'he-IL', label: 'Hebrew' },
    { id: 'hr-HR', label: 'Croatian' },
    { id: 'hu-HU', label: 'Hungarian' },
    { id: 'ja-JP', label: 'Japanese' },
    { id: 'ko-KR', label: 'Korean' },
    { id: 'nn-NO', label: 'Norwegian' },
    { id: 'pl-PL', label: 'Polish' },
    { id: 'ro-RO', label: 'Romanian' },
    { id: 'ru-RU', label: 'Russian' },
    { id: 'fi-FI', label: 'Finnish' },
    { id: 'zh-CN', label: 'Chinese (Simplified)' },
    { id: 'vi-VN', label: 'Vietnamese' },
    { id: 'sk-SK', label: 'Slovak' },
    { id: 'bg-BG', label: 'Bulgarian' },
    { id: 'tr-TR', label: 'Turkish' },
    { id: 'ur-PK', label: 'Urdu' },
    { id: 'hi-IN', label: 'Hindi' },
    { id: 'th-TH', label: 'Thai' },
    { id: 'ms-MY', label: 'Malay' },
    { id: 'id-ID', label: 'Indonesian' },
    { id: 'fil-PH', label: 'Filipino' },
    { id: 'sr-Latn', label: 'Serbian' },
    { id: 'ar-AE', label: 'Arabic' },
];
const PALETTE_CATEGORIES_ORDER = [
    'INVITATION_WORKFLOWS',
    'REGISTRATION_WORKFLOWS',
    'WAITING_LIST_WORKFLOWS',
    'CANCELLATION_WORKFLOWS',
    'PAYMENT_WORKFLOWS',
    'OTHER_WORKFLOWS',
];
const PALETTE_CATEGORIES_INDEX = {
    INVITATION_WORKFLOWS: 1,
    REGISTRATION_WORKFLOWS: 2,
    PAYMENT_WORKFLOWS: 3,
    WAITING_LIST_WORKFLOWS: 4,
    OTHER_WORKFLOWS: 5,
    CANCELLATION_WORKFLOWS: 0,
};
const WORKFLOW_TYPE_CATEGORIES = {
    'create-work-block': ['OTHER_WORKFLOWS'],
    [WorkflowType.ARRIVAL]: ['REGISTRATION_WORKFLOWS'],
    [WorkflowType.CANCELLATION]: ['CANCELLATION_WORKFLOWS'],
    [WorkflowType.DECLINE]: ['CANCELLATION_WORKFLOWS'],
    [WorkflowType.EVENT_CANCELLATION]: ['CANCELLATION_WORKFLOWS'],
    [WorkflowType.INVITATION]: ['INVITATION_WORKFLOWS'],
    [WorkflowType.MULTI_REGISTRATION]: ['REGISTRATION_WORKFLOWS'],
    [WorkflowType.PAYMENT]: ['PAYMENT_WORKFLOWS'],
    [WorkflowType.PAYMENT_WAITINGLIST]: [
        'PAYMENT_WORKFLOWS',
        'WAITING_LIST_WORKFLOWS',
    ],
    [WorkflowType.PRE_ARRIVAL]: ['REGISTRATION_WORKFLOWS'],
    [WorkflowType.PROFILE]: ['OTHER_WORKFLOWS'],
    [WorkflowType.PUBLIC_REGISTRATION]: ['REGISTRATION_WORKFLOWS'],
    [WorkflowType.PUBLIC_REGISTRATION_AND_MEMBERSHIP]: [
        'REGISTRATION_WORKFLOWS',
    ],
    [WorkflowType.REGISTRAION_WAITINGLIST]: [
        'REGISTRATION_WORKFLOWS',
        'WAITING_LIST_WORKFLOWS',
    ],
    [WorkflowType.REGISTRATION]: ['REGISTRATION_WORKFLOWS'],
    [WorkflowType.STAGE_ACTION]: ['OTHER_WORKFLOWS'],
    [WorkflowType.WAITINGLIST]: ['WAITING_LIST_WORKFLOWS'],
};
const WORKFLOW_TYPE_ORDER = {
    [WorkflowType.DECLINE]: 0,
    [WorkflowType.CANCELLATION]: 1,
    [WorkflowType.EVENT_CANCELLATION]: 2,
    [WorkflowType.INVITATION]: 3,
    [WorkflowType.PUBLIC_REGISTRATION]: 4,
    [WorkflowType.PUBLIC_REGISTRATION_AND_MEMBERSHIP]: 5,
    [WorkflowType.REGISTRAION_WAITINGLIST]: 6,
    [WorkflowType.REGISTRATION]: 7,
    [WorkflowType.MULTI_REGISTRATION]: 8,
    [WorkflowType.PAYMENT]: 9,
    [WorkflowType.PAYMENT_WAITINGLIST]: 10,
    [WorkflowType.WAITINGLIST]: 11,
    [WorkflowType.PRE_ARRIVAL]: 12,
    [WorkflowType.ARRIVAL]: 13,
    [WorkflowType.PROFILE]: 14,
    [WorkflowType.STAGE_ACTION]: 15,
};
const getPaletteCategoryMap = () => {
    return Object.keys(WORKFLOW_TYPE_CATEGORIES).reduce((record, key) => {
        const paletteSymbol = key;
        WORKFLOW_TYPE_CATEGORIES[paletteSymbol].forEach((category) => {
            record[category] = [...(record[category] ?? []), paletteSymbol];
        });
        return record;
    }, {});
};
const PALETTE_CATEGORIES_MAP = getPaletteCategoryMap();

/**
 * Please place the code according to the `// #region` comment tag
 *
 * For example `// #region General utils` `// #region Diagram utils`
 */
// #region General utils
const omit = (data, properties) => {
    const result = { ...data };
    properties.forEach((key) => delete result[key]);
    return result;
};
const objectKeys = (o) => {
    return Object.keys(o);
};
const delay = (milliSeconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds);
    });
};
const getGroupByValue = (rows, fieldName) => {
    return rows.reduce((group, row) => {
        group[row[fieldName]] = [...(group[row[fieldName]] ?? []), row];
        return group;
    }, {});
};
const getMapByValue = (rows, fieldName) => {
    return rows.reduce((group, row) => {
        group[row[fieldName]] = row;
        return group;
    }, {});
};
const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};
/**
 *
 * @param target
 * @param source
 * @returns new object that merged both `target` & `source` with properties from `source` replacing existing `target`'s properties
 */
const mergeDeep = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        objectKeys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};
// #endregion
// #region HTML template utils
const trackByWorkflowProperty = (index, item) => {
    return item.attribute;
};
const trackBy = (attribute) => (index, item) => item[attribute];
const trackByAttributeTranslations = (index, item) => {
    return item.value;
};
// #endregion
// #region Diagram utils
const getConnectorAnnotation = (outputPin) => {
    return outputPin !== OutputPin.OUTPUT
        ? [
            {
                content: outputPin.split('-')[0],
            },
        ]
        : [];
};
const getValidConnectorsFromWorkfowFactory = (workflows) => workflows.reduce((result, workflow) => {
    const nextWorkflows = workflow.getNextWorkflows();
    objectKeys(nextWorkflows).forEach((outputType) => {
        const next_workflow_ids = nextWorkflows[outputType];
        if (next_workflow_ids) {
            result.push({
                ...DEFAULT_CONNECTOR,
                id: `${PREFIX_CONNECTOR}${workflow.getId()}_${outputType}`,
                sourceID: `${PREFIX_NODE}${workflow.getId()}`,
                sourcePortID: `${PREFIX_PORT}_${outputType}_pin`,
                targetID: `${PREFIX_NODE}${next_workflow_ids}`,
                targetPortID: `${PREFIX_PORT}_${OUTPUT_PIN_PAIR[outputType]}_pin`,
                annotations: getConnectorAnnotation(outputType),
                constraints: ConnectorConstraints.Default -
                    ConnectorConstraints.DragSourceEnd,
            });
        }
    });
    return result;
}, []);
const getDefaultInputPinPort = (type) => {
    const inputPinOffsetMap = {
        [InputPin.INPUT]: { x: 0, y: 0.5 },
        [InputPin.CANCELLATION_INPUT]: { x: 0.5, y: 0 },
        [InputPin.DECLINE_INPUT]: { x: 0.5, y: 0 },
    };
    return {
        id: `${PREFIX_PORT}_${type}_pin`,
        offset: inputPinOffsetMap[type],
        visibility: PortVisibility.Visible,
        constraints: PortConstraints.InConnect,
        style: {
            fill: '#fff',
            strokeColor: '#ccc',
            strokeWidth: DEFAULT_STROKE_WIDTH,
            opacity: 0.8,
        },
        shape: 'Circle',
        height: 8,
        width: 8,
    };
};
const getDefaultOutputPinPort = (type) => {
    const outputPinOffsetMap = {
        [OutputPin.OUTPUT]: { x: 1, y: 0.5 },
        [OutputPin.EXISTING_CONTACT]: { x: 1, y: 0.5 },
        [OutputPin.INVITED_CONTACT]: { x: 1, y: 0.5 },
        [OutputPin.NEW_CONTACT]: { x: 1, y: 0.5 },
        [OutputPin.CANCELLATION_OUTPUT]: { x: 0.5, y: 1 },
        [OutputPin.DECLINE_OUTPUT]: { x: 0.5, y: 1 },
    };
    return {
        id: `${PREFIX_PORT}_${type}_pin`,
        offset: outputPinOffsetMap[type],
        visibility: PortVisibility.Visible,
        style: {
            fill: '#fff',
            strokeColor: '#aaa',
            strokeWidth: DEFAULT_STROKE_WIDTH,
        },
        shape: 'Circle',
        height: 8,
        width: 8,
        constraints: PortConstraints.Draw | PortConstraints.OutConnect,
    };
};
const getDefaultNode = () => ({
    shape: { type: 'HTML' },
    ports: [
        getDefaultInputPinPort(InputPin.INPUT),
        getDefaultOutputPinPort(OutputPin.OUTPUT),
    ],
    width: DEFAULT_NODE_WIDTH,
    height: DEFAULT_NODE_HEIGHT,
    annotations: [],
    constraints: NodeConstraints.Default -
        NodeConstraints.Rotate -
        NodeConstraints.Resize -
        NodeConstraints.HideThumbs -
        NodeConstraints.Delete,
    // constraints: NodeConstraints.Default,
});
// #endregion
// #region Workflow data utils
const getWorkflowIdFromNodeId = (nodeId) => {
    return nodeId.replace(PREFIX_NODE, '');
};
const getOutputSidePins = (pins) => {
    return pins.filter((pin) => OUTPUT_PIN_PAIR[pin] === InputPin.INPUT);
};
const getOutputNonSidePins = (pins) => {
    return pins.filter((pin) => OUTPUT_PIN_PAIR[pin] !== InputPin.INPUT);
};
const getMultipleOutputPorts = (pins) => {
    const sidePins = getOutputSidePins(pins);
    const nonSidePins = getOutputNonSidePins(pins);
    return sidePins
        .map((pin, index) => {
        const port = getDefaultOutputPinPort(pin);
        port.offset.y = (index + 1) / (sidePins.length + 1);
        return port;
    })
        .concat(nonSidePins.map(getDefaultOutputPinPort));
};
const getNodePortsFromFactory = (factory) => {
    return [
        ...factory.inputPin.map((inputPin) => getDefaultInputPinPort(inputPin)),
        ...getMultipleOutputPorts(factory.outputPin),
    ].filter((port) => !!port);
};
const getNodeFromCanvasControllerData = (data) => {
    const { coordinate, factory } = data;
    return {
        ...getDefaultNode(),
        id: `${PREFIX_NODE}${factory.getId()}`,
        offsetX: coordinate.x,
        offsetY: coordinate.y,
        ports: getNodePortsFromFactory(factory),
    };
};
const getNodeAndConnectorsFromCanvasControllerData = (canvasItems) => ({
    nodes: canvasItems.map((data) => getNodeFromCanvasControllerData(data)),
    connectors: [
        ...getValidConnectorsFromWorkfowFactory(canvasItems.map(({ factory }) => factory)),
    ],
});
const getWorkflowFactory = (type, data) => {
    const factory = getCanvasWorkflow(type);
    if (data) {
        try {
            factory.setWorkflow(data);
            objectKeys(data.custom_processes).forEach((processKey) => factory.setCustomProcess(processKey, data.custom_processes[processKey]));
        }
        catch (e) {
            console.error(e);
        }
    }
    return factory;
};
const getWorkflowTypeArray = () => {
    return objectKeys(WorkflowType).reduce((result, data) => {
        const workflowType = WorkflowType[data];
        // eslint-disable-next-line eqeqeq
        if (workflowType != undefined) {
            result.push(workflowType);
        }
        return result;
    }, []);
};
const workflowTypeArray = getWorkflowTypeArray();
const getOutputPinFromConnector = (connector) => {
    const sourcePin = connector.sourcePortID;
    return sourcePin?.replace(`${PREFIX_PORT}_`, ``).replace('_pin', '');
};
const reorderWorkflowsByPaletteCategory = (workflows) => {
    return {
        mainWorkflows: workflows
            .filter((workflow) => WORKFLOW_TYPE_CATEGORIES[workflow.type][0] !==
            'CANCELLATION_WORKFLOWS')
            .sort((workflowA, workflowB) => WORKFLOW_TYPE_ORDER[workflowA.type] -
            WORKFLOW_TYPE_ORDER[workflowB.type]),
        cancellationWorkflows: workflows
            .filter((workflow) => WORKFLOW_TYPE_CATEGORIES[workflow.type][0] ===
            'CANCELLATION_WORKFLOWS')
            .sort((workflowA, workflowB) => WORKFLOW_TYPE_ORDER[workflowA.type] -
            WORKFLOW_TYPE_ORDER[workflowB.type]),
    };
};
const getOrderedIEventWorkflows = (workflows) => {
    const gap = 80;
    const { mainWorkflows, cancellationWorkflows } = reorderWorkflowsByPaletteCategory(workflows);
    const workflowToCanvasItem = (workflow, position) => ({
        canvas: {
            coordinate: {
                x: gap + position.x * (DEFAULT_NODE_WIDTH + gap),
                y: gap + position.y * (DEFAULT_NODE_HEIGHT + gap),
            },
            name: '',
            description: '',
        },
        workflow: {
            custom_processes: [],
            id: workflow.id,
            settings: workflow.settings,
            type: workflow.type,
        },
    });
    return [
        ...mainWorkflows.map((workflow, index) => workflowToCanvasItem(workflow, {
            x: index,
            y: 0,
        })),
        ...cancellationWorkflows.map((workflow, index) => workflowToCanvasItem(workflow, { x: index, y: 1 })),
    ];
};
// #endregion
// #region Forms utils
const getFormDirtyValues = (form) => {
    const dirtyValues = {};
    objectKeys(form.controls).forEach((key) => {
        const abstractControl = form.controls[key];
        if (abstractControl.dirty) {
            if (abstractControl instanceof FormGroup) {
                dirtyValues[key] = getFormDirtyValues(abstractControl);
            }
            else {
                dirtyValues[key] = abstractControl.value;
            }
        }
    });
    return dirtyValues;
};
function createFormGroupFromData(data) {
    if (Array.isArray(data)) {
        const formArray = new FormArray(data.map((row) => createFormGroupFromData(row)));
        return formArray;
    }
    if (typeof data === 'object' && !!data) {
        const formGroup = new FormGroup({});
        objectKeys(data).forEach((key) => {
            formGroup.addControl(key, 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            createFormGroupFromData(data[key]));
        });
        return formGroup;
    }
    return new FormControl(data);
}
// Palette Utils
const getNodeModelForPaletteFromWorkflowType = (workflowType, sharedSvc) => {
    const factory = getCanvasWorkflow(workflowType);
    const outputPins = factory.outputPin;
    const sideOutputPins = getOutputSidePins(outputPins);
    return {
        ...getDefaultNode(),
        addInfo: { type: workflowType, label: workflowType },
        ports: getNodePortsFromFactory(factory) ?? [],
        id: workflowType,
        constraints: NodeConstraints.Default,
        padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
        margin: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
        shape: {
            type: 'HTML',
            content: `<div class="palette-item">
            <div class="palette-item__inner">
            <i class="material-icons-outlined palette-item__icon">dataset</i>
          ${factory.inputPin.map((inputPin) => 
            // eslint-disable-next-line prettier/prettier
            `<div class="palette-item__${inputPin}"></div>`)}${getOutputNonSidePins(outputPins).map((outputPin) => 
            // eslint-disable-next-line prettier/prettier
            `<div class="palette-item__${outputPin}"></div>`)}${sideOutputPins.map((outputPin, index) => {
                const top = ((index + 1) * 100) / (sideOutputPins.length + 1);
                return `<div class="palette-item__${outputPin} palette-item__output" style="top: ${Math.round(top)}%;"></div>`;
            })}
            </div>
            <div class="palette-item__title">${` ${sharedSvc.translate(WORKFLOW_NAME_TRANSLATIONS[workflowType])}`}</div>
          </div>`,
        },
    };
};
// eslint-disable-next-line max-len
const nodeModelForPaletteCreateWorkBlock = {
    ...getDefaultNode(),
    addInfo: { type: 'create-work-block', label: 'CREATE_WORKBLOCK' },
    ports: [],
    id: 'create-work-block',
    constraints: NodeConstraints.None,
    shape: {
        type: 'HTML',
        content: `<div class="palette-item">
            <div class="palette-item__inner">
            <i class="material-icons-outlined palette-item__icon">post_add</i>
            </div>
          </div>`,
    },
};
const getNodeModelForPalette = (paletteSymbol, sharedSvc) => {
    if (paletteSymbol === 'create-work-block') {
        return nodeModelForPaletteCreateWorkBlock;
    }
    return getNodeModelForPaletteFromWorkflowType(paletteSymbol, sharedSvc);
};
// local storage tools
const jsonParse = (jsonText) => {
    let myResponse;
    if (jsonText == null) {
        return undefined;
    }
    try {
        myResponse = JSON.parse(jsonText);
    }
    catch (e) {
        myResponse = undefined;
        throw new Error('Error occured: ', e);
    }
    return myResponse;
};
const getBuilderWorkflowLocalStorageKey = (eventId) => `azavista-workflow-builder-${eventId}`;
const getBuilderWorkflowFromLocalStorage = (eventId) => {
    const content = localStorage.getItem(getBuilderWorkflowLocalStorageKey(eventId));
    return jsonParse(content);
};
const saveBuilderWorkflowToLocalStorage = (eventId, data) => {
    localStorage.setItem(getBuilderWorkflowLocalStorageKey(eventId), JSON.stringify(data));
};

const getAzavistaServiceLibCacheProxy = (apiSvc, methodNames) => {
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

const getCrmStatusArray = () => {
    return objectKeys(CrmStatus).reduce((result, data) => {
        const crmStatus = CrmStatus[data];
        // eslint-disable-next-line eqeqeq
        if (crmStatus != undefined) {
            result.push(crmStatus);
        }
        return result;
    }, []);
};
const crmStatusArray = getCrmStatusArray();
class AzavistaWorkflowBuilderController {
    constructor() {
        this.dataMap = {};
        this.validityMap = {};
        this.initStatus$ = new BehaviorSubject(undefined);
    }
    async initFromProvider(dataProvider, eventId) {
        this.initStatus$.next('processing');
        this.eventId = eventId;
        this.dataProvider = dataProvider;
        this.init({
            workflows: await this.dataProvider.getAllWorkflowsForInit(eventId),
        });
        this.initStatus$.next('completed');
    }
    init(workflowData) {
        workflowData?.workflows.forEach(({ workflow, canvas }) => {
            this.addWorkflow(workflow.type, canvas, workflow);
        });
    }
    addWorkflow(type, canvas, data) {
        const factory = getWorkflowFactory(type, data);
        const createdData = { factory, ...canvas };
        this.dataMap[factory.getId()] = createdData;
        this.updateValidityMap(factory);
        this.save();
        return createdData;
    }
    updateWorkflowSettings(workflowId, data) {
        const { factory } = this.dataMap[workflowId];
        factory?.setValues(data);
        this.updateValidityMap(factory);
        this.save();
    }
    updateWorkflowCoordinate(workflowId, coordinate) {
        if (this.dataMap[workflowId]?.coordinate) {
            this.dataMap[workflowId].coordinate = coordinate;
            this.save();
        }
    }
    updateWorkflowNextWorkflow(outputType, sourceWorkflowId, targetWorkflowId) {
        if (!sourceWorkflowId) {
            return;
        }
        const { factory } = this.dataMap[sourceWorkflowId];
        factory?.setNextWorkflow(outputType, targetWorkflowId);
        this.updateValidityMap(factory);
        this.save();
    }
    updateWorkflowCanvas(workflowId, data) {
        if (this.dataMap[workflowId]) {
            this.dataMap[workflowId] = {
                ...this.dataMap[workflowId],
                ...data,
            };
            this.save();
        }
    }
    updateWorkflowProcess(workflowId, attribute, steps) {
        const { factory } = this.dataMap[workflowId];
        factory?.setCustomProcess(attribute, steps);
        this.updateValidityMap(factory);
        this.save();
    }
    isValidNextWorkflow(outputType, sourceWorkflowId, targetWorkflowId, isNewConnection = false) {
        const isTargetingSelf = sourceWorkflowId === targetWorkflowId;
        const sourceWorkflow = sourceWorkflowId
            ? this.dataMap[sourceWorkflowId]
            : null;
        const possibleWorkflows = sourceWorkflow?.factory.getPossibleWorkflows(outputType, Object.values(this.dataMap).map(({ factory }) => factory)) ?? [];
        const noOutputPin = possibleWorkflows.length === 0;
        const inValidTargetPin = targetWorkflowId && !possibleWorkflows.includes(targetWorkflowId);
        const isAddingMultipleConnection = !!(isNewConnection &&
            sourceWorkflow?.factory.getNextWorkflows()[outputType]);
        const isAddingEmptySourceConnection = isNewConnection && !sourceWorkflowId;
        if (noOutputPin ||
            inValidTargetPin ||
            isTargetingSelf ||
            isAddingMultipleConnection ||
            isAddingEmptySourceConnection) {
            this.log('isValidNextWorkflow', {
                isTargetingSelf,
                sourceWorkflow,
                possibleWorkflows,
                noOutputPin,
                inValidTargetPin,
                isAddingMultipleConnection,
                isAddingEmptySourceConnection,
            });
            return false;
        }
        return true;
    }
    deleteWorkflow(workflowId) {
        delete this.dataMap[workflowId];
        delete this.validityMap[workflowId];
        this.validityMap = {
            ...this.validityMap,
        };
        this.save();
    }
    getCurrentState() {
        const workflows = Object.entries(this.dataMap).reduce((result, [, { factory, coordinate, description, name }]) => {
            return result.concat([
                {
                    canvas: { coordinate, description, name },
                    workflow: factory.getWorkflow(),
                },
            ]);
        }, []);
        return { workflows };
    }
    async save() {
        this.log('save', {
            eventId: this.eventId,
            getCurrentState: this.getCurrentState(),
        });
        if (this.eventId) {
            this.dataProvider?.saveBuilderData(this.eventId, this.getCurrentState());
        }
    }
    async publish() {
        if (this.eventId) {
            this.dataProvider?.publishBuilderData(this.eventId, this.getCurrentState());
        }
    }
    async getInitializedWorkflowsMap() {
        return firstValueFrom(this.initStatus$.pipe(filter((status) => status === 'completed'), map(() => this.dataMap)));
    }
    log(logName, ...params) {
        if (this.isDebugCallback?.()) {
            console.groupCollapsed(logName);
            console.trace(params);
            console.groupEnd();
        }
    }
    updateValidityMap(factory) {
        this.validityMap = {
            ...this.validityMap,
            [factory.getId()]: factory.isValidated(),
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderController, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderController, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
class WorkflowBuilderProviderAbstract {
    constructor(workflowController) {
        this.workflowController = workflowController;
    }
    async getBuilderData(eventId) {
        const unformattedWorkflows = await this.getAllWorkflowsForInit(eventId);
        return {
            draftConnectors: [],
            workflows: unformattedWorkflows,
        };
    }
    async getAllWorkflowsForDataSource(skippedWorkflowIds) {
        const dataMap = await this.workflowController.getInitializedWorkflowsMap();
        return Object.values(dataMap)
            .filter((data) => !skippedWorkflowIds.includes(data.factory.getId()))
            .map((data) => data.factory);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProviderAbstract, deps: [{ token: AzavistaWorkflowBuilderController }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProviderAbstract }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProviderAbstract, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: AzavistaWorkflowBuilderController }]; } });

// eslint-disable-next-line max-len
class WorkflowBuilderProviderApi extends WorkflowBuilderProviderAbstract {
    constructor(apiSvc, controller) {
        super(controller);
        this.apiSvc = apiSvc;
        this.controller = controller;
        this.cacheService = getAzavistaServiceLibCacheProxy(this.apiSvc, [
            'getAllPages',
            'getAllEventEmailCampaigns',
            'getAllUsers',
            'searchTeams',
            'getAllEvents',
            'getAllEventFields',
            'getAllEventParticipantFields',
            'getAllEventAssets',
            'getEventSettings',
            'getProcess',
            'getEvent',
            'searchIntegrations',
        ]);
        this.dataSourceCallbacks = {
            Form: async (eventId) => this.getAllPageForms(eventId),
            Page: (eventId) => this.getAllPagesNonForm(eventId),
            Email: (eventId) => this.cacheService.getAllEventEmailCampaigns(eventId),
            CrmStatus: async () => crmStatusArray,
            Workflow: (eventId, options) => this.getAllWorkflowsForDataSource(options.skippedWorkflowIds),
            ProfilePage: (eventId) => this.cacheService.getAllPages("Profile" /* PageType.profile */, eventId),
        };
        this.processDataSourceCallback = {
            users: () => this.cacheService.getAllUsers(),
            event: async (eventId) => this.getProcessDataSourceEvent(eventId),
            getEventFields: async (eventId) => this.cacheService.getAllEventFields(eventId),
            integrations: () => this.apiSvc.getAllPagedItems((req) => this.cacheService.searchIntegrations(req), (res) => res.integrations),
        };
    }
    async getAllPageForms(eventId) {
        const allPages = await this.cacheService.getAllPages("Page" /* PageType.page */, eventId);
        return allPages.filter((page) => page.is_form && page.is_published);
    }
    async getAllPagesNonForm(eventId) {
        const allPages = await this.cacheService.getAllPages("Page" /* PageType.page */, eventId);
        return allPages.filter((page) => !page.is_form && page.is_published);
    }
    async getAllWorkflowsForInit(eventId) {
        const response = await this.apiSvc.getAllEventWorkflows("event" /* EventWorkflowParentType.event */, eventId);
        return getOrderedIEventWorkflows(response.workflows);
    }
    async saveBuilderData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventId, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data) {
        // TODO: save workflows action
    }
    async publishBuilderData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventId, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data) {
        // TODO: publish workflows action
    }
    async getProcessDataSourceEvent(eventId) {
        const eventDetail = await this.cacheService.getEvent(eventId);
        const [assets, participantFields, eventSettings, teams, templateEvents,] = await Promise.all([
            this.cacheService.getAllEventAssets(eventId),
            this.cacheService.getAllEventParticipantFields(eventId),
            this.cacheService.getEventSettings(eventId),
            this.getEventTeams(eventDetail),
            this.getTemplateEvents(eventDetail),
        ]);
        return {
            detail: eventDetail,
            assets,
            participantFields,
            settings: eventSettings.settings,
            teams,
            templateEvents,
        };
    }
    async getEventTeams(event) {
        if (event.type === "workflow" /* EventType.workflow */) {
            const searchTeamsRequest = {
                limit: 50,
                offset: 0,
            };
            const params = [
                {
                    field: { name: 'id' },
                    value: event.team_ids,
                    operator: 'in',
                },
            ];
            searchTeamsRequest.advancedQuery = flatSearchToRecursive(params, 'name');
            const searchTeamsResponse = await this.cacheService.searchTeams(searchTeamsRequest);
            return searchTeamsResponse.teams;
        }
        return undefined;
    }
    async getTemplateEvents(event) {
        if (event.type === "workflow" /* EventType.workflow */) {
            const allTemplateEvents = await this.apiSvc.getAllEvents("template" /* EventType.template */);
            return allTemplateEvents;
        }
        return undefined;
    }
}

class WorkflowBuilderService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, deps: [{ token: i1.AzavistaApiService }, { token: AzavistaWorkflowBuilderController }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AzavistaApiService }, { type: AzavistaWorkflowBuilderController }, { type: i3.TranslateService }]; } });

class AzavistaWorkflowBuilderFormFieldService {
    constructor(sharedSvc, translateSvc) {
        this.sharedSvc = sharedSvc;
        this.translateSvc = translateSvc;
        this.getPageAttributeTranslation = (pages) => {
            return pages.map((page) => ({
                value: page.id,
                trans: {
                    [this.translateSvc.currentLang]: page.name,
                },
            }));
        };
        this.getWorkflowAttributeTranslations = (workflows, skippedId) => {
            return workflows.reduce((result, factory) => {
                const id = factory.getId();
                if (!skippedId?.includes(id)) {
                    const workflow = factory.getWorkflow();
                    result.push({
                        value: id,
                        trans: {
                            [this.translateSvc.currentLang]: workflow.type,
                        },
                    });
                }
                return result;
            }, []);
        };
        this.getEmailCampaignAttributeTranslations = (emails) => {
            return emails.map((email) => ({
                value: email.id,
                trans: {
                    [this.translateSvc.currentLang]: email.name,
                },
            }));
        };
        this.getCrmAttributeTranslations = () => {
            return crmStatusArray.map((crmStatus) => ({
                value: crmStatus,
                trans: {
                    [this.translateSvc.currentLang]: crmStatus,
                },
            }));
        };
        this.translationsMapCallback = {
            CrmStatus: this.getCrmAttributeTranslations,
            Email: this.getEmailCampaignAttributeTranslations,
            Form: this.getPageAttributeTranslation,
            Page: this.getPageAttributeTranslation,
            ProfilePage: this.getPageAttributeTranslation,
            Workflow: this.getWorkflowAttributeTranslations,
        };
        this.getCanvasDataFields = (workflowType) => {
            const baseField = {
                category: '',
                builtin: true,
                editable: true,
                mandatory_for_planners: true,
                schema: {
                    type: 'string',
                },
            };
            return [
                {
                    ...baseField,
                    id: 'name',
                    name: 'name',
                    label: this.sharedSvc.translate('NAME'),
                    placeholder: this.sharedSvc.translate(WORKFLOW_NAME_TRANSLATIONS[workflowType]),
                },
                {
                    ...baseField,
                    id: 'description',
                    name: 'description',
                    label: this.sharedSvc.translate('DESCRIPTION'),
                    placeholder: this.sharedSvc.translate(WORKFLOW_EXPLANATION_TRANSLATIONS[workflowType]),
                    component: "textarea" /* FieldComponentType.textarea */,
                },
            ];
        };
    }
    getFormGroupFromWorkflowFactory(properties, factory) {
        const formGroup = new FormGroup({});
        properties.forEach((property) => {
            formGroup.addControl(property.attribute, this.getFormControlFromWorkflowProperty(property, factory));
        });
        return formGroup;
    }
    getFormControlFromWorkflowProperty(property, factory) {
        const { type } = property;
        const workflowSettings = factory.getWorkflow().settings;
        const validators = property.mandatory ? Validators.required : [];
        const asyncValidators = async (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        control) => {
            await delay(500);
            control.markAsDirty();
            control.markAsTouched();
            return factory.validateAttribute(property)
                ? null
                : { validatorError: control.value };
        };
        switch (type) {
            case 'multiselect': {
                return new FormArray(workflowSettings[property.attribute]?.map((value) => {
                    return new FormControl(value);
                }) ?? [], validators, asyncValidators);
            }
            case 'select':
            case 'boolean':
            case 'number':
            case 'text': {
                return new FormControl(workflowSettings[property.attribute], 
                // property.mandatory ? Validators.required : [],
                validators, asyncValidators);
            }
            case 'process': {
                return createFormGroupFromData(factory.getCustomProcess(property.attribute) ?? []);
            }
        }
    }
    async getFieldFromWorkflowProperty(property, provider, options) {
        const { attribute, schema, datasource, label, mandatory, type } = property;
        const baseField = {
            category: '',
            builtin: true,
            editable: true,
            id: attribute,
            name: attribute,
            label: this.sharedSvc.translate(label),
            mandatory_for_planners: mandatory,
        };
        switch (type) {
            case 'select': {
                const attributeTranslations = await this.getFieldDataSourceTranslations(datasource, provider, options);
                return {
                    ...baseField,
                    type: 'select',
                    schema: mergeDeep(schema ?? {}, {
                        type: 'string',
                        enum: attributeTranslations.map(({ value }) => value),
                    }),
                    attributeTranslations,
                };
            }
            case 'multiselect': {
                const attributeTranslations = await this.getFieldDataSourceTranslations(property.datasource, provider, options);
                return {
                    ...baseField,
                    type: 'multi-select',
                    schema: mergeDeep(schema ?? {}, {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: attributeTranslations.map(({ value }) => value),
                        },
                    }),
                    attributeTranslations,
                };
            }
            case 'boolean':
            case 'number':
            case 'text': {
                return {
                    ...baseField,
                    type: type,
                    schema: mergeDeep(schema ?? {}, {
                        type: type === 'text' ? 'string' : type,
                    }),
                };
            }
            case 'process': {
                return {
                    ...baseField,
                    type: 'boolean',
                    schema: {
                        type: 'boolean',
                    },
                };
            }
        }
    }
    async getFieldDataSourceTranslations(dataSource, provider, options) {
        const dataSourceCallback = provider.dataSourceCallbacks[dataSource];
        const dataSourceRows = await dataSourceCallback(options.eventId, {
            skippedWorkflowIds: [options.workflowId],
        });
        const translationsCallback = this.translationsMapCallback[dataSource];
        return translationsCallback(dataSourceRows);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderFormFieldService, deps: [{ token: i1$1.AzavistaSharedService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderFormFieldService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AzavistaWorkflowBuilderFormFieldService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AzavistaSharedService }, { type: i3.TranslateService }]; } });

class ApplyFunctionPipe {
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

class WorkflowBuilderNodeFormHeaderComponent {
    constructor(sharedSvc) {
        this.sharedSvc = sharedSvc;
        this.editMode = false;
        this.canvasChanges = new EventEmitter();
        this.getWorkflowName = (formValueName) => {
            return (formValueName ||
                (this.controllerData?.factory.type
                    ? this.sharedSvc.translate(WORKFLOW_NAME_TRANSLATIONS[this.controllerData?.factory.type])
                    : ''));
        };
        this.getWorkflowDescription = (formValueDescription) => {
            return (formValueDescription ||
                (this.controllerData?.factory.type
                    ? this.sharedSvc.translate(WORKFLOW_EXPLANATION_TRANSLATIONS[this.controllerData?.factory.type])
                    : ''));
        };
    }
    ngOnInit() {
        if (this.controllerData) {
            this.formGroup = this.createFormGroup(this.controllerData);
            this.formGroup.valueChanges
                .pipe(debounceTime(200))
                .subscribe((changes) => this.canvasChanges.emit(changes));
        }
    }
    createFormGroup(controllerData) {
        return new FormGroup({
            description: new FormControl(controllerData.description),
            name: new FormControl(controllerData.name),
        });
    }
    toggleEditMode(forceValue) {
        this.editMode = forceValue ?? !this.editMode;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormHeaderComponent, deps: [{ token: i1$1.AzavistaSharedService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormHeaderComponent, selector: "azavista-workflow-builder-node-form-header", inputs: { editMode: "editMode", controllerData: "controllerData" }, outputs: { canvasChanges: "canvasChanges" }, ngImport: i0, template: "<div class=\"workflow-builder-node-item__header\" [class.edit-mode]=\"editMode\">\r\n  <ng-container *ngIf=\"!editMode\">\r\n    <a\r\n      class=\"workflow-builder-node-item__header__name\"\r\n    >\r\n      {{ formGroup?.value?.name | apply : getWorkflowName}}\r\n      <button (click)=\"toggleEditMode(true)\" mat-icon-button>\r\n        <mat-icon>create</mat-icon>\r\n      </button>\r\n    </a>\r\n    <div class=\"workflow-builder-node-item__header__description\">\r\n      {{ formGroup?.value?.description | apply: getWorkflowDescription }}\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"editMode && formGroup\">\r\n    <div class=\"workflow-builder-node-item__header__name\">\r\n      <mat-form-field>\r\n        <input\r\n          matInput\r\n          [formControl]=\"formGroup.controls.name\"\r\n          [placeholder]=\"'NAME' | translate\"\r\n        />\r\n        <mat-icon (click)=\"toggleEditMode(false)\" matSuffix>create</mat-icon>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"workflow-builder-node-item__header__description\">\r\n      <mat-form-field>\r\n        <textarea\r\n          matInput\r\n          cdkTextareaAutosize\r\n          [formControl]=\"formGroup.controls.description\"\r\n          [placeholder]=\"'DESCRIPTION' | translate\"\r\n        ></textarea>\r\n      </mat-form-field>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n", styles: [".mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}:host{display:block}:host ::ng-deep *{box-sizing:border-box;font-size:12px}.workflow-builder-node-item__header{font-weight:600;line-height:24px;margin-bottom:4px;font-size:11px;color:#797879}.workflow-builder-node-item__header azavista-grouped-field{margin-top:8px}.workflow-builder-node-item__header__name,.workflow-builder-node-item__header__description{display:flex;align-items:center;gap:4px;width:100%;text-wrap:pretty;overflow-wrap:anywhere}.workflow-builder-node-item__header__name .mat-mdc-form-field,.workflow-builder-node-item__header__description .mat-mdc-form-field{width:100%}.workflow-builder-node-item__header__name input,.workflow-builder-node-item__header__name textarea,.workflow-builder-node-item__header__description input,.workflow-builder-node-item__header__description textarea{font:inherit;background-color:transparent;width:100%;line-height:1.5em}.workflow-builder-node-item__header__name{font-size:1.2em;margin-bottom:8px;color:#666}.workflow-builder-node-item__header__name>button{--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 24px;overflow:hidden;top:0;right:0;padding:0}.workflow-builder-node-item__header__name mat-icon{font-size:1rem;padding:2px 0;cursor:pointer}.workflow-builder-node-item__header__description{font-size:.9em;line-height:1.5em}.edit-mode.workflow-builder-node-item__header__name{justify-content:flex-end}.edit-mode.workflow-builder-node-item__header__name mat-icon{position:absolute}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i6.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "component", type: i7.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }, { kind: "pipe", type: ApplyFunctionPipe, name: "apply" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form-header', template: "<div class=\"workflow-builder-node-item__header\" [class.edit-mode]=\"editMode\">\r\n  <ng-container *ngIf=\"!editMode\">\r\n    <a\r\n      class=\"workflow-builder-node-item__header__name\"\r\n    >\r\n      {{ formGroup?.value?.name | apply : getWorkflowName}}\r\n      <button (click)=\"toggleEditMode(true)\" mat-icon-button>\r\n        <mat-icon>create</mat-icon>\r\n      </button>\r\n    </a>\r\n    <div class=\"workflow-builder-node-item__header__description\">\r\n      {{ formGroup?.value?.description | apply: getWorkflowDescription }}\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"editMode && formGroup\">\r\n    <div class=\"workflow-builder-node-item__header__name\">\r\n      <mat-form-field>\r\n        <input\r\n          matInput\r\n          [formControl]=\"formGroup.controls.name\"\r\n          [placeholder]=\"'NAME' | translate\"\r\n        />\r\n        <mat-icon (click)=\"toggleEditMode(false)\" matSuffix>create</mat-icon>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"workflow-builder-node-item__header__description\">\r\n      <mat-form-field>\r\n        <textarea\r\n          matInput\r\n          cdkTextareaAutosize\r\n          [formControl]=\"formGroup.controls.description\"\r\n          [placeholder]=\"'DESCRIPTION' | translate\"\r\n        ></textarea>\r\n      </mat-form-field>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n", styles: [".mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}:host{display:block}:host ::ng-deep *{box-sizing:border-box;font-size:12px}.workflow-builder-node-item__header{font-weight:600;line-height:24px;margin-bottom:4px;font-size:11px;color:#797879}.workflow-builder-node-item__header azavista-grouped-field{margin-top:8px}.workflow-builder-node-item__header__name,.workflow-builder-node-item__header__description{display:flex;align-items:center;gap:4px;width:100%;text-wrap:pretty;overflow-wrap:anywhere}.workflow-builder-node-item__header__name .mat-mdc-form-field,.workflow-builder-node-item__header__description .mat-mdc-form-field{width:100%}.workflow-builder-node-item__header__name input,.workflow-builder-node-item__header__name textarea,.workflow-builder-node-item__header__description input,.workflow-builder-node-item__header__description textarea{font:inherit;background-color:transparent;width:100%;line-height:1.5em}.workflow-builder-node-item__header__name{font-size:1.2em;margin-bottom:8px;color:#666}.workflow-builder-node-item__header__name>button{--mdc-icon-button-icon-size: 14px;--mdc-icon-button-state-layer-size: 24px;overflow:hidden;top:0;right:0;padding:0}.workflow-builder-node-item__header__name mat-icon{font-size:1rem;padding:2px 0;cursor:pointer}.workflow-builder-node-item__header__description{font-size:.9em;line-height:1.5em}.edit-mode.workflow-builder-node-item__header__name{justify-content:flex-end}.edit-mode.workflow-builder-node-item__header__name mat-icon{position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.AzavistaSharedService }]; }, propDecorators: { editMode: [{
                type: Input
            }], controllerData: [{
                type: Input
            }], canvasChanges: [{
                type: Output
            }] } });

class WorkflowBuilderNodeFormFieldBaseComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldBaseComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormFieldBaseComponent, selector: "ng-component", inputs: { property: "property", control: "control", workflowId: "workflowId", eventId: "eventId" }, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldBaseComponent, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], propDecorators: { property: [{
                type: Input
            }], control: [{
                type: Input
            }], workflowId: [{
                type: Input
            }], eventId: [{
                type: Input
            }] } });
class WorkflowBuilderNodeFormFieldTextComponent extends WorkflowBuilderNodeFormFieldBaseComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldTextComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormFieldTextComponent, selector: "azavista-workflow-builder-node-form-field-text", inputs: { property: "property" }, usesInheritance: true, ngImport: i0, template: "<mat-form-field\r\n  *ngIf=\"property && control\"\r\n  [hideRequiredMarker]=\"false\"\r\n  [class.mat-form-field-mandatory]=\"property.mandatory\"\r\n  [class.mat-form-field-not-empty]=\"control.value\"\r\n>\r\n  <mat-label>{{ property.label | translate }}</mat-label>\r\n  <input\r\n    [type]=\"property.type\"\r\n    [formControl]=\"control\"\r\n    [required]=\"property.mandatory\"\r\n    placeholder=\"{{ property.label | translate }}\"\r\n    matInput\r\n  />\r\n  <!-- <mat-error *ngIf=\"!control.valid\"></mat-error> -->\r\n</mat-form-field>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldTextComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form-field-text', template: "<mat-form-field\r\n  *ngIf=\"property && control\"\r\n  [hideRequiredMarker]=\"false\"\r\n  [class.mat-form-field-mandatory]=\"property.mandatory\"\r\n  [class.mat-form-field-not-empty]=\"control.value\"\r\n>\r\n  <mat-label>{{ property.label | translate }}</mat-label>\r\n  <input\r\n    [type]=\"property.type\"\r\n    [formControl]=\"control\"\r\n    [required]=\"property.mandatory\"\r\n    placeholder=\"{{ property.label | translate }}\"\r\n    matInput\r\n  />\r\n  <!-- <mat-error *ngIf=\"!control.valid\"></mat-error> -->\r\n</mat-form-field>\r\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { property: [{
                type: Input
            }] } });

class WorkflowBuilderNodeFormFieldSelectComponent extends WorkflowBuilderNodeFormFieldBaseComponent {
    constructor(fieldSvc, controller, translateSvc, ngZone) {
        super();
        this.fieldSvc = fieldSvc;
        this.controller = controller;
        this.translateSvc = translateSvc;
        this.ngZone = ngZone;
        this.currentLang = this.translateSvc.currentLang;
        this.trackByAttributeTranslations = trackByAttributeTranslations;
        this.isExpanded = false;
        this.dataSourceIcon = {
            Page: 'language',
            Email: 'email',
            Form: 'web',
            CrmStatus: 'event_available',
            ProfilePage: 'account_circle',
            Workflow: 'dataset_outline',
        };
        this.dataSourceColor = {
            Page: '#4C83FF',
            Email: '#FF786A',
            Form: '#FEB002',
            CrmStatus: '#98CA71',
            ProfilePage: '#0F1A43',
            Workflow: '#5D5FEF',
        };
    }
    async ngOnInit() {
        if (this.property &&
            this.controller.dataProvider &&
            this.eventId &&
            this.workflowId) {
            this.attributeTranslations =
                await this.fieldSvc.getFieldDataSourceTranslations(this.property.datasource, this.controller.dataProvider, {
                    eventId: this.eventId,
                    workflowId: this.workflowId,
                });
        }
    }
    async onSelectOpen() {
        this.isExpanded = !this.isExpanded;
        this.selectElement?.close();
    }
    onItemSelected(itemTranslation) {
        if (this.control) {
            this.control.markAsDirty();
            if (this.control instanceof FormArray) {
                const arrayValues = this.control.value;
                const shouldAdd = !arrayValues.includes(itemTranslation.value);
                if (shouldAdd) {
                    this.control.push(new FormControl(itemTranslation.value));
                }
                else {
                    const index = arrayValues.findIndex((value) => value === itemTranslation.value);
                    this.control.removeAt(index);
                }
            }
            else {
                // single select
                this.control.setValue(itemTranslation.value);
                this.isExpanded = false;
            }
        }
    }
    isValueEmpty(controlValue) {
        return !(this.property?.type === 'multiselect' &&
            controlValue instanceof Array
            ? controlValue.length > 0
            : controlValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldSelectComponent, deps: [{ token: AzavistaWorkflowBuilderFormFieldService }, { token: AzavistaWorkflowBuilderController }, { token: i3.TranslateService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormFieldSelectComponent, selector: "azavista-workflow-builder-node-form-field-select", inputs: { property: "property" }, viewQueries: [{ propertyName: "selectElement", first: true, predicate: ["selectElement"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<mat-expansion-panel\r\n  *ngIf=\"control && property\"\r\n  [(expanded)]=\"isExpanded\"\r\n  [class.mat-expansion-panel-field-not-empty]=\"\r\n    property.type === 'multiselect'\r\n      ? $any(control.value).length > 0\r\n      : control.value\r\n  \"\r\n  [class.mat-expansion-panel-field-valid]=\"control.valid\"\r\n>\r\n  <mat-expansion-panel-header>\r\n    <mat-panel-title>\r\n      <mat-form-field *ngIf=\"attributeTranslations\"\r\n        appearance=\"outline\"\r\n        [hideRequiredMarker]=\"false\"\r\n        [class.mat-form-field-mandatory]=\"property.mandatory\"\r\n        [class.mat-form-field-not-empty]=\"\r\n          property.type === 'multiselect'\r\n            ? $any(control.value).length > 0\r\n            : control.value\r\n        \"\r\n      >\r\n        <mat-label>{{ property.label | translate }}</mat-label>\r\n        <mat-icon\r\n          *ngIf=\"\r\n            property.type === 'multiselect'\r\n              ? $any(control.value).length > 0\r\n              : control.value\r\n          \"\r\n          matPrefix\r\n          [style.color]=\"dataSourceColor[property.datasource] + ' !important'\"\r\n          >{{ dataSourceIcon[property.datasource] }}</mat-icon\r\n        >\r\n\r\n        <mat-select\r\n          [required]=\"property.mandatory\"\r\n          #selectElement\r\n          (opened)=\"onSelectOpen()\"\r\n          [value]=\"control.value\"\r\n          [multiple]=\"property.type === 'multiselect'\"\r\n          [panelClass]=\"'panel-select-' + property.attribute\"\r\n          placeholder=\"{{ property.label | translate }}\"\r\n        >\r\n          <mat-option\r\n            *ngFor=\"\r\n              let item of attributeTranslations;\r\n              trackBy: trackByAttributeTranslations\r\n            \"\r\n            [value]=\"item.value\"\r\n            >{{ item.trans[currentLang] }}</mat-option\r\n          >\r\n        </mat-select>\r\n        <mat-error *ngIf=\"!control.valid\"></mat-error>\r\n      </mat-form-field>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <mat-selection-list\r\n    [multiple]=\"property.type === 'multiselect'\"\r\n    color=\"primary\"\r\n  >\r\n    <mat-list-option\r\n      *ngFor=\"\r\n        let item of attributeTranslations;\r\n        trackBy: trackByAttributeTranslations\r\n      \"\r\n      (click)=\"onItemSelected(item)\"\r\n      [value]=\"item.value\"\r\n      [selected]=\"$any(control.value)?.includes?.(item.value)\"\r\n    >\r\n      {{ item.trans[currentLang] }}\r\n    </mat-list-option>\r\n  </mat-selection-list>\r\n</mat-expansion-panel>\r\n", styles: [":host{display:block;--mat-expansion-header-collapsed-state-height: 2em;--mat-expansion-header-expanded-state-height: 2em}mat-expansion-panel.mat-expansion-panel{box-shadow:none}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-mdc-list-base.mat-mdc-selection-list{--mdc-list-list-item-label-text-font: inherit;--mdc-list-list-item-label-text-line-height: 2em;--mdc-list-list-item-label-text-size: 1em;--mdc-list-list-item-one-line-container-height: 3em;--mdc-list-list-item-two-line-container-height: 5em;--mdc-list-list-item-three-line-container-height: 7em}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-mdc-list-base.mat-mdc-selection-list .mat-mdc-list-item{border-radius:0;border-top:1px solid #ccc;margin-bottom:0!important}mat-expansion-panel.mat-expansion-panel.mat-expansion-panel-field-not-empty.mat-expansion-panel-field-valid{--mdc-outlined-text-field-outline-color: #4caf50;border:1px solid var(--mdc-outlined-text-field-outline-color)!important}mat-expansion-panel-header{padding:0;background-color:#fff!important;height:min-content}mat-expansion-panel-header ::ng-deep .mdc-text-field--outlined{--mdc-outlined-text-field-outline-width: 0px}mat-expansion-panel-header ::ng-deep .mat-expansion-indicator{padding:4px 1em}mat-expansion-panel-header ::ng-deep .mdc-notched-outline__notch{display:flex}mat-expansion-panel-header mat-select,mat-expansion-panel-header mat-form-field{pointer-events:none}.mat-icon{font-size:14px;line-height:1em;width:1em;height:1em;padding:.5em}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5$1.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i5$1.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i7$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i7$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { kind: "directive", type: i7$1.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "component", type: i8$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "panelWidth", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i9.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "component", type: i10.MatSelectionList, selector: "mat-selection-list", inputs: ["color", "compareWith", "multiple", "hideSingleSelectionIndicator", "disabled"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { kind: "component", type: i10.MatListOption, selector: "mat-list-option", inputs: ["togglePosition", "checkboxPosition", "color", "value", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form-field-select', template: "<mat-expansion-panel\r\n  *ngIf=\"control && property\"\r\n  [(expanded)]=\"isExpanded\"\r\n  [class.mat-expansion-panel-field-not-empty]=\"\r\n    property.type === 'multiselect'\r\n      ? $any(control.value).length > 0\r\n      : control.value\r\n  \"\r\n  [class.mat-expansion-panel-field-valid]=\"control.valid\"\r\n>\r\n  <mat-expansion-panel-header>\r\n    <mat-panel-title>\r\n      <mat-form-field *ngIf=\"attributeTranslations\"\r\n        appearance=\"outline\"\r\n        [hideRequiredMarker]=\"false\"\r\n        [class.mat-form-field-mandatory]=\"property.mandatory\"\r\n        [class.mat-form-field-not-empty]=\"\r\n          property.type === 'multiselect'\r\n            ? $any(control.value).length > 0\r\n            : control.value\r\n        \"\r\n      >\r\n        <mat-label>{{ property.label | translate }}</mat-label>\r\n        <mat-icon\r\n          *ngIf=\"\r\n            property.type === 'multiselect'\r\n              ? $any(control.value).length > 0\r\n              : control.value\r\n          \"\r\n          matPrefix\r\n          [style.color]=\"dataSourceColor[property.datasource] + ' !important'\"\r\n          >{{ dataSourceIcon[property.datasource] }}</mat-icon\r\n        >\r\n\r\n        <mat-select\r\n          [required]=\"property.mandatory\"\r\n          #selectElement\r\n          (opened)=\"onSelectOpen()\"\r\n          [value]=\"control.value\"\r\n          [multiple]=\"property.type === 'multiselect'\"\r\n          [panelClass]=\"'panel-select-' + property.attribute\"\r\n          placeholder=\"{{ property.label | translate }}\"\r\n        >\r\n          <mat-option\r\n            *ngFor=\"\r\n              let item of attributeTranslations;\r\n              trackBy: trackByAttributeTranslations\r\n            \"\r\n            [value]=\"item.value\"\r\n            >{{ item.trans[currentLang] }}</mat-option\r\n          >\r\n        </mat-select>\r\n        <mat-error *ngIf=\"!control.valid\"></mat-error>\r\n      </mat-form-field>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <mat-selection-list\r\n    [multiple]=\"property.type === 'multiselect'\"\r\n    color=\"primary\"\r\n  >\r\n    <mat-list-option\r\n      *ngFor=\"\r\n        let item of attributeTranslations;\r\n        trackBy: trackByAttributeTranslations\r\n      \"\r\n      (click)=\"onItemSelected(item)\"\r\n      [value]=\"item.value\"\r\n      [selected]=\"$any(control.value)?.includes?.(item.value)\"\r\n    >\r\n      {{ item.trans[currentLang] }}\r\n    </mat-list-option>\r\n  </mat-selection-list>\r\n</mat-expansion-panel>\r\n", styles: [":host{display:block;--mat-expansion-header-collapsed-state-height: 2em;--mat-expansion-header-expanded-state-height: 2em}mat-expansion-panel.mat-expansion-panel{box-shadow:none}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-mdc-list-base.mat-mdc-selection-list{--mdc-list-list-item-label-text-font: inherit;--mdc-list-list-item-label-text-line-height: 2em;--mdc-list-list-item-label-text-size: 1em;--mdc-list-list-item-one-line-container-height: 3em;--mdc-list-list-item-two-line-container-height: 5em;--mdc-list-list-item-three-line-container-height: 7em}mat-expansion-panel.mat-expansion-panel ::ng-deep .mat-mdc-list-base.mat-mdc-selection-list .mat-mdc-list-item{border-radius:0;border-top:1px solid #ccc;margin-bottom:0!important}mat-expansion-panel.mat-expansion-panel.mat-expansion-panel-field-not-empty.mat-expansion-panel-field-valid{--mdc-outlined-text-field-outline-color: #4caf50;border:1px solid var(--mdc-outlined-text-field-outline-color)!important}mat-expansion-panel-header{padding:0;background-color:#fff!important;height:min-content}mat-expansion-panel-header ::ng-deep .mdc-text-field--outlined{--mdc-outlined-text-field-outline-width: 0px}mat-expansion-panel-header ::ng-deep .mat-expansion-indicator{padding:4px 1em}mat-expansion-panel-header ::ng-deep .mdc-notched-outline__notch{display:flex}mat-expansion-panel-header mat-select,mat-expansion-panel-header mat-form-field{pointer-events:none}.mat-icon{font-size:14px;line-height:1em;width:1em;height:1em;padding:.5em}\n"] }]
        }], ctorParameters: function () { return [{ type: AzavistaWorkflowBuilderFormFieldService }, { type: AzavistaWorkflowBuilderController }, { type: i3.TranslateService }, { type: i0.NgZone }]; }, propDecorators: { property: [{
                type: Input
            }], selectElement: [{
                type: ViewChild,
                args: ['selectElement']
            }] } });

// eslint-disable-next-line max-len
class WorkflowBuilderNodeFormFieldToggleComponent extends WorkflowBuilderNodeFormFieldBaseComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldToggleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormFieldToggleComponent, selector: "azavista-workflow-builder-node-form-field-toggle", usesInheritance: true, ngImport: i0, template: "<mat-slide-toggle\r\n  *ngIf=\"control && property\"\r\n  class=\"example-margin\"\r\n  color=\"primary\"\r\n  labelPosition=\"before\"\r\n  [checked]=\"control.value\"\r\n  (change)=\"control.setValue($event.checked)\"\r\n>\r\n  {{property.label | translate}}\r\n</mat-slide-toggle>\r\n", styles: [":host{display:block}:host ::ng-deep .mdc-switch{transform:scale(.6)!important}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form-field-toggle', template: "<mat-slide-toggle\r\n  *ngIf=\"control && property\"\r\n  class=\"example-margin\"\r\n  color=\"primary\"\r\n  labelPosition=\"before\"\r\n  [checked]=\"control.value\"\r\n  (change)=\"control.setValue($event.checked)\"\r\n>\r\n  {{property.label | translate}}\r\n</mat-slide-toggle>\r\n", styles: [":host{display:block}:host ::ng-deep .mdc-switch{transform:scale(.6)!important}\n"] }]
        }] });

class WorkflowBuilderProcessBuilderComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderComponent, deps: [{ token: AzavistaWorkflowBuilderController }, { token: i1$1.AzavistaSharedService }, { token: i1$1.NotificationsService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderProcessBuilderComponent, selector: "azavista-workflow-builder-process-builder", inputs: { eventId: "eventId", getAclObjectForCurrentUser: "getAclObjectForCurrentUser", fullProcess: "fullProcess", showOnlyFlowBuilder: "showOnlyFlowBuilder", processType: "processType" }, outputs: { stepsSaved: "stepsSaved" }, viewQueries: [{ propertyName: "azFlowBuilder", first: true, predicate: AzavistaFlowBuilderComponent, descendants: true }], ngImport: i0, template: "<azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [steps]=\"fullProcess?.steps ?? []\"\r\n    [title]=\"fullProcess?.name ?? ''\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"false\"\r\n    [flowPaused]=\"!!fullProcess?.paused\"\r\n    [addNewConfig]=\"$any(addNewConfig)\"\r\n    [emailTemplates]=\"emailTemplates ?? []\"\r\n    [teams]=\"workflowTeams ?? []\"\r\n    [emailCampaigns]=\"emailCampaigns ?? []\"\r\n    [integrations]=\"$any(integrations) ?? []\"\r\n    [users]=\"users ?? []\"\r\n    [languages]=\"languages ?? []\"\r\n    [templateEvents]=\"templateEvents ?? []\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages \"\r\n    [fields]=\"fields ?? []\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments ?? []\"\r\n    [documentFields]=\"documentFields ?? []\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder>\r\n\r\n\r\n<!-- <azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [canEditStepsAcl]=\"canEditStepsAcl\"\r\n    [canEditPausedAcl]=\"canEditPausedAcl\"\r\n    [canInterruptAcl]=\"canInterruptAcl\"\r\n    [steps]=\"fullProcess?.steps\"\r\n    [title]=\"fullProcess?.name\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"true\"\r\n    [flowPaused]=\"fullProcess?.paused\"\r\n    [addNewConfig]=\"addNewConfig\"\r\n    [emailTemplates]=\"emailTemplates\"\r\n    [teams]=\"workflowTeams\"\r\n    [emailCampaigns]=\"emailCampaigns\"\r\n    [integrations]=\"integrations\"\r\n    [users]=\"users\"\r\n    [languages]=\"languages\"\r\n    [templateEvents]=\"templateEvents\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages\"\r\n    [fields]=\"fields\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments\"\r\n    [documentFields]=\"documentFields\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder> -->\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4$1.AzavistaFlowBuilderComponent, selector: "azavista-flow-builder", inputs: ["canEditStepsAcl", "canEditPausedAcl", "canInterruptAcl", "steps", "title", "canEditSteps", "canEditStatus", "addNewConfig", "globalProcessEntityType", "stages", "fields", "fieldsOptions", "emailTemplates", "teams", "users", "events", "emailCampaigns", "integrations", "languages", "flowPaused", "templateEvents", "templateEventFieldsSubject", "isGlobalParticipant", "docxDocuments", "documentFields"], outputs: ["changesSaved", "notConfigured", "flowPausedChanged", "flowInterrupted"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-process-builder', template: "<azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [steps]=\"fullProcess?.steps ?? []\"\r\n    [title]=\"fullProcess?.name ?? ''\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"false\"\r\n    [flowPaused]=\"!!fullProcess?.paused\"\r\n    [addNewConfig]=\"$any(addNewConfig)\"\r\n    [emailTemplates]=\"emailTemplates ?? []\"\r\n    [teams]=\"workflowTeams ?? []\"\r\n    [emailCampaigns]=\"emailCampaigns ?? []\"\r\n    [integrations]=\"$any(integrations) ?? []\"\r\n    [users]=\"users ?? []\"\r\n    [languages]=\"languages ?? []\"\r\n    [templateEvents]=\"templateEvents ?? []\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages \"\r\n    [fields]=\"fields ?? []\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments ?? []\"\r\n    [documentFields]=\"documentFields ?? []\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder>\r\n\r\n\r\n<!-- <azavista-flow-builder\r\n    *ngIf=\"loaded\"\r\n    [canEditStepsAcl]=\"canEditStepsAcl\"\r\n    [canEditPausedAcl]=\"canEditPausedAcl\"\r\n    [canInterruptAcl]=\"canInterruptAcl\"\r\n    [steps]=\"fullProcess?.steps\"\r\n    [title]=\"fullProcess?.name\"\r\n    [canEditSteps]=\"true\"\r\n    [canEditStatus]=\"true\"\r\n    [flowPaused]=\"fullProcess?.paused\"\r\n    [addNewConfig]=\"addNewConfig\"\r\n    [emailTemplates]=\"emailTemplates\"\r\n    [teams]=\"workflowTeams\"\r\n    [emailCampaigns]=\"emailCampaigns\"\r\n    [integrations]=\"integrations\"\r\n    [users]=\"users\"\r\n    [languages]=\"languages\"\r\n    [templateEvents]=\"templateEvents\"\r\n    [templateEventFieldsSubject]=\"templateEventFieldsSubject\"\r\n    [stages]=\"stages\"\r\n    [fields]=\"fields\"\r\n    [fieldsOptions]=\"fieldsOptions\"\r\n    [docxDocuments]=\"docxDocuments\"\r\n    [documentFields]=\"documentFields\"\r\n    (changesSaved)=\"onChangesSaved($event)\"\r\n    (notConfigured)=\"onNotConfigured()\"\r\n    (flowPausedChanged)=\"onFlowPausedChanged($event)\"\r\n    (flowInterrupted)=\"onFlowInterrupted()\"\r\n></azavista-flow-builder> -->\r\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: AzavistaWorkflowBuilderController }, { type: i1$1.AzavistaSharedService }, { type: i1$1.NotificationsService }]; }, propDecorators: { eventId: [{
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

class WorkflowBuilderProcessBuilderDialogComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
    }
    onStepsSaved(steps) {
        this.dialogRef.close(steps);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderDialogComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$2.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderProcessBuilderDialogComponent, selector: "azavista-workflow-builder-process-builder-dialog", ngImport: i0, template: "<div mat-dialog-content>\r\n  <azavista-workflow-builder-process-builder\r\n    [eventId]=\"data.eventId\"\r\n    [fullProcess]=\"data.fullProcess\"\r\n    [getAclObjectForCurrentUser]=\"data.getAclObjectForCurrentUser\"\r\n    [processType]=\"data.processType\"\r\n    [showOnlyFlowBuilder]=\"data.showOnlyFlowBuilder\"\r\n    (stepsSaved)=\"onStepsSaved($event)\"\r\n  ></azavista-workflow-builder-process-builder>\r\n</div>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i1$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: WorkflowBuilderProcessBuilderComponent, selector: "azavista-workflow-builder-process-builder", inputs: ["eventId", "getAclObjectForCurrentUser", "fullProcess", "showOnlyFlowBuilder", "processType"], outputs: ["stepsSaved"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderProcessBuilderDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-process-builder-dialog', template: "<div mat-dialog-content>\r\n  <azavista-workflow-builder-process-builder\r\n    [eventId]=\"data.eventId\"\r\n    [fullProcess]=\"data.fullProcess\"\r\n    [getAclObjectForCurrentUser]=\"data.getAclObjectForCurrentUser\"\r\n    [processType]=\"data.processType\"\r\n    [showOnlyFlowBuilder]=\"data.showOnlyFlowBuilder\"\r\n    (stepsSaved)=\"onStepsSaved($event)\"\r\n  ></azavista-workflow-builder-process-builder>\r\n</div>\r\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$2.MatDialogRef }]; } });

// eslint-disable-next-line max-len
class WorkflowBuilderNodeFormFieldProcessComponent extends WorkflowBuilderNodeFormFieldBaseComponent {
    constructor(dialog, controller) {
        super();
        this.dialog = dialog;
        this.controller = controller;
    }
    async openSteps() {
        const fullProcess = {
            name: '',
            steps: this.control && Array.isArray(this.control?.value)
                ? this.control.value
                : [],
            // TODO: define trigger
            trigger: undefined,
            stage_submit: '',
            paused: false,
        };
        const dialogData = {
            eventId: this.eventId,
            processType: "participant" /* ProcessType.participant */,
            showOnlyFlowBuilder: true,
            fullProcess,
            getAclObjectForCurrentUser: () => ({
                allowed: true,
                availableScopes: [],
                requiredScopes: [],
            }),
        };
        const results = await firstValueFrom(this.dialog
            .open(WorkflowBuilderProcessBuilderDialogComponent, {
            data: dialogData,
            width: `800px`,
        })
            .afterClosed());
        if (results && this.control && this.control instanceof FormArray) {
            const controlArray = this.control;
            controlArray.controls.forEach(() => {
                controlArray.removeAt(-1);
            });
            results.forEach((step) => controlArray.push(createFormGroupFromData(step)));
            // controlArray.insert(new FormGroup<FormGroupType<Step>({
            // }))
            if (this.workflowId && this.property) {
                this.controller.updateWorkflowProcess(this.workflowId, this.property?.attribute, results);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldProcessComponent, deps: [{ token: i1$2.MatDialog }, { token: AzavistaWorkflowBuilderController }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormFieldProcessComponent, selector: "azavista-workflow-builder-node-form-field-process", inputs: { property: "property" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"property\">\r\n  <button\r\n    mat-flat-button\r\n    (click)=\"openSteps()\"\r\n    [class.has-steps]=\"control?.value?.length\"\r\n  >\r\n    <mat-icon *ngIf=\"!control?.value?.length\">add</mat-icon>\r\n    <mat-icon *ngIf=\"control?.value?.length\">settings</mat-icon>\r\n    {{ property.label | translate }}\r\n  </button>\r\n</ng-container>\r\n", styles: [":host{display:block}button{width:100%;border:2px dashed #C2D8F8;border-radius:4px;padding-left:1em;padding-right:1em}button:hover{background-color:#eee;border-width:3px;padding-left:calc(1em - 1px);padding-right:calc(1em - 1px)}button:hover ::ng-deep .mat-mdc-button-persistent-ripple:before,button:hover .mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple:before{opacity:0}button.has-steps{background-color:#e4ffd7}button.has-steps mat-icon{order:2;margin:0}button.has-steps ::ng-deep .mdc-button__label{flex:1;text-align:left}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormFieldProcessComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form-field-process', template: "<ng-container *ngIf=\"property\">\r\n  <button\r\n    mat-flat-button\r\n    (click)=\"openSteps()\"\r\n    [class.has-steps]=\"control?.value?.length\"\r\n  >\r\n    <mat-icon *ngIf=\"!control?.value?.length\">add</mat-icon>\r\n    <mat-icon *ngIf=\"control?.value?.length\">settings</mat-icon>\r\n    {{ property.label | translate }}\r\n  </button>\r\n</ng-container>\r\n", styles: [":host{display:block}button{width:100%;border:2px dashed #C2D8F8;border-radius:4px;padding-left:1em;padding-right:1em}button:hover{background-color:#eee;border-width:3px;padding-left:calc(1em - 1px);padding-right:calc(1em - 1px)}button:hover ::ng-deep .mat-mdc-button-persistent-ripple:before,button:hover .mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple:before{opacity:0}button.has-steps{background-color:#e4ffd7}button.has-steps mat-icon{order:2;margin:0}button.has-steps ::ng-deep .mdc-button__label{flex:1;text-align:left}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$2.MatDialog }, { type: AzavistaWorkflowBuilderController }]; }, propDecorators: { property: [{
                type: Input
            }] } });

class WorkflowBuilderNodeFormComponent {
    get workflowId() {
        return getWorkflowIdFromNodeId(this.node.id);
    }
    get controllerData() {
        return this.controller.dataMap[this.workflowId];
    }
    get isWorkflowValid() {
        return this.controller.validityMap[this.workflowId];
    }
    constructor(sharedSvc, host, controller, resize$, ngZone, formFieldService) {
        this.sharedSvc = sharedSvc;
        this.host = host;
        this.controller = controller;
        this.resize$ = resize$;
        this.ngZone = ngZone;
        this.formFieldService = formFieldService;
        this.attrNodeId = '';
        this.workflowSettingsChanges = new EventEmitter();
        this.canvasChanges = new EventEmitter();
        this.removeNode = new EventEmitter();
        this.properties = [];
        this.fields = [];
        this.trackByWorkflowProperty = trackByWorkflowProperty;
    }
    async ngOnInit() {
        this.attrNodeId = this.node.id;
        const { controllerData } = this;
        if (!controllerData) {
            return;
        }
        this.workflowSettingsGroupedFieldData =
            await this.createWorkflowSettingsGroupFieldData(controllerData);
        this.initFormGroup(controllerData);
        this.canvasGroupFieldData =
            this.createCanvasGroupedFieldsData(controllerData);
        await firstValueFrom(this.ngZone.onStable);
        this.loadFieldsCssClass();
        this.resize$.pipe(debounceTime(50)).subscribe(async () => {
            const rect = this.host.nativeElement.getBoundingClientRect();
            const nodeInstance = this.getNodeInstance();
            if (nodeInstance) {
                nodeInstance.height = rect?.height;
            }
        });
    }
    onKeyDown(event) {
        // prevent when typing on form get treated as moving or deleting workflow item
        event.stopPropagation();
    }
    initFormGroup(controllerData) {
        const { factory } = controllerData;
        this.properties = factory.getProperties();
        this.formGroup = this.formFieldService.getFormGroupFromWorkflowFactory(this.properties, factory);
        this.formGroup.valueChanges.pipe(debounceTime(200)).subscribe(() => {
            this.controller.updateWorkflowSettings(this.workflowId, getFormDirtyValues(this.formGroup));
        });
    }
    async createWorkflowSettingsGroupedFieldFields(factory) {
        const { dataProvider } = this.controller;
        if (!dataProvider) {
            return [];
        }
        return Promise.all(factory.getPropertiesWithSchema().map((property) => {
            return this.formFieldService.getFieldFromWorkflowProperty(property, dataProvider, {
                eventId: this.eventId,
                workflowId: this.workflowId,
            });
        }));
    }
    // eslint-disable-next-line max-len
    async createWorkflowSettingsGroupFieldData(controllerData) {
        const { factory } = controllerData;
        this.properties = factory.getProperties();
        const fields = await this.createWorkflowSettingsGroupedFieldFields(factory);
        this.fields = fields;
        this.workflowItem = factory.getWorkflow();
        return {
            singleColumn: true,
            editModeForAllFields: true,
            disableAutoOrdering: true,
            fieldsOptions: [
                {
                    fieldId: 'sad',
                    options: {},
                },
            ],
            fieldsWithEntity: {
                entity: factory.getWorkflow().settings,
                fields,
            },
            expandPanels: false,
        };
    }
    async toggleExpandPanels() {
        if (this.workflowSettingsGroupedFieldData) {
            this.workflowSettingsGroupedFieldData.expandPanels =
                !this.workflowSettingsGroupedFieldData.expandPanels;
        }
    }
    createCanvasGroupedFieldsData(controllerData) {
        const { name, description, factory: { type }, } = controllerData;
        return {
            expandPanels: true,
            editModeForAllFields: true,
            singleColumn: true,
            disableAutoOrdering: true,
            fieldsWithEntity: {
                fields: this.formFieldService.getCanvasDataFields(type),
                entity: {
                    name: name ??
                        this.sharedSvc.translate(WORKFLOW_NAME_TRANSLATIONS[type]),
                    description: description ??
                        this.sharedSvc.translate(WORKFLOW_EXPLANATION_TRANSLATIONS[type]),
                },
            },
        };
    }
    onUpdateCanvasFields(data) {
        this.canvasChanges.emit(data);
        if (this.canvasGroupFieldData?.fieldsWithEntity.entity) {
            this.canvasGroupFieldData.fieldsWithEntity.entity = {
                ...this.canvasGroupFieldData?.fieldsWithEntity.entity,
                ...data,
            };
        }
    }
    onUpdateWorkflowSettingsFields(data) {
        if (this.workflowSettingsGroupedFieldEl?.invalidFieldsWithValues
            ?.length > 0 ||
            data.obj == null ||
            objectKeys(data.obj).length === 0) {
            return;
        }
        /**
         * We hack the way to display the process button by creating a checkbox as a button.
         * Therefore, we intercept the changes from the process-field and use the checkbox to open a popup
         */
        const workflowProcessProperties = this.controllerData?.factory
            .getProperties()
            .filter(({ type }) => type === 'process') ?? [];
        const isProcessField = workflowProcessProperties.some(({ attribute }) => attribute === data.changedFieldWithValue?.field.id);
        if (isProcessField) {
            this.openProcessPopup();
            return;
        }
        this.workflowSettingsChanges.emit({
            ...data,
            obj: data.obj
                ? omit$1(data.obj, workflowProcessProperties.map(({ attribute }) => attribute))
                : data.obj,
        });
    }
    loadFieldsCssClass() {
        this.controllerData?.factory.getProperties().forEach((properties) => {
            const { attribute, datasource } = properties;
            if (datasource) {
                this.host.nativeElement
                    .querySelector(`azavista-input-field[field-id=${attribute}]`)
                    ?.classList.add(`datasource-${datasource}`);
            }
        });
    }
    openProcessPopup() {
        alert('Opening Process Popup');
    }
    getNodeInstance() {
        return this.diagramEl.nodes.find(({ id }) => id === this.node.id);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormComponent, deps: [{ token: i1$1.AzavistaSharedService }, { token: i0.ElementRef }, { token: AzavistaWorkflowBuilderController }, { token: i3$1.NgResizeObserver }, { token: i0.NgZone }, { token: AzavistaWorkflowBuilderFormFieldService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderNodeFormComponent, selector: "azavista-workflow-builder-node-form", inputs: { node: "node", eventId: "eventId", diagramEl: "diagramEl" }, outputs: { workflowSettingsChanges: "workflowSettingsChanges", canvasChanges: "canvasChanges", removeNode: "removeNode" }, host: { listeners: { "keydown": "onKeyDown($event)" }, properties: { "attr.nodeId": "this.attrNodeId" } }, providers: [...ngResizeObserverProviders], viewQueries: [{ propertyName: "workflowSettingsGroupedFieldEl", first: true, predicate: ["workflowSettingsGroupedField"], descendants: true, read: AzavistaGroupedFieldsComponent }, { propertyName: "formHeader", first: true, predicate: ["formHeader"], descendants: true }], ngImport: i0, template: "<div\r\n  class=\"workflow-builder-node-item\"\r\n  *ngIf=\"workflowSettingsGroupedFieldData && canvasGroupFieldData\"\r\n>\r\n  <azavista-workflow-builder-node-form-header\r\n    #formHeader\r\n    [controllerData]=\"controllerData\"\r\n    (canvasChanges)=\"onUpdateCanvasFields($event)\"\r\n  ></azavista-workflow-builder-node-form-header>\r\n\r\n  <div class=\"workflow-builder-node-item__fields\">\r\n    <ng-container *ngIf=\"workflowSettingsGroupedFieldData.expandPanels\">\r\n      <ng-container\r\n        *ngFor=\"let property of properties; trackBy: trackByWorkflowProperty\"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"formGroup?.controls?.[property.attribute] as formControl\"\r\n        >\r\n          <azavista-workflow-builder-node-form-field-select\r\n            *ngIf=\"\r\n              property.type === 'select' || property.type === 'multiselect'\r\n            \"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"property\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-select>\r\n          <azavista-workflow-builder-node-form-field-text\r\n            *ngIf=\"property.type === 'text' || property.type === 'number'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-text>\r\n          <azavista-workflow-builder-node-form-field-toggle\r\n            *ngIf=\"property.type === 'boolean'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-toggle>\r\n          <azavista-workflow-builder-node-form-field-process\r\n            *ngIf=\"property.type === 'process'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-process>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n  <div\r\n    class=\"workflow-builder-node-item__footer\"\r\n    *ngIf=\"workflowSettingsGroupedFieldData.fieldsWithEntity.fields.length > 0\"\r\n  >\r\n    <azavista-button (click)=\"toggleExpandPanels()\" color=\"primary\">{{\r\n      (workflowSettingsGroupedFieldData.expandPanels\r\n        ? \"CLOSE\"\r\n        : isWorkflowValid\r\n          ? \"OPEN\"\r\n          : \"SETUP\"\r\n      ) | translate\r\n    }}</azavista-button>\r\n  </div>\r\n  <div\r\n    class=\"workflow-builder-node-item__absolute-elements\">\r\n    <button *ngIf=\"!formHeader.editMode\" class=\"workflow-builder-node-item__absolute-elements__button-delete\" mat-icon-button (click)=\"removeNode.emit()\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n", styles: [":host{font-size:12px;display:flex;position:relative;width:100%;height:min-content;border:1px solid #ccc;background-color:#f5f4f5;border-radius:4px;padding:1em;box-sizing:border-box}:host ::ng-deep *,:host ::ng-deep .mat-mdc-slide-toggle .mdc-label{font-size:12px;font-family:var(--azavista-font)}:host ::ng-deep .mat-mdc-form-field-infix{min-height:36px}:host ::ng-deep .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}:host ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}:host ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}:host ::ng-deep .mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:none}:host ::ng-deep .mat-mdc-form-field{background-color:#fff}:host ::ng-deep .mat-mdc-form-field .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}:host ::ng-deep .mat-mdc-form-field .mat-mdc-select-arrow-wrapper{display:none}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined:hover{background-color:transparent}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:4px 0!important;min-height:auto}:host ::ng-deep .mat-mdc-form-field .mat-mdc-form-field-required-marker{color:var(--palette-warn-500)!important}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty label,:host ::ng-deep .mat-mdc-form-field.mat-focused label{display:none}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty .mdc-notched-outline__notch,:host ::ng-deep .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch{width:0px!important;padding:0}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty:not(.mat-form-field-invalid){--mdc-outlined-text-field-outline-color: #4caf50}.hidden.hidden[class]{display:none}.workflow-builder-node-item{display:flex;flex-direction:column;max-width:100%;width:100%;height:min-content;gap:.8em}.workflow-builder-node-item__fields{display:flex;flex-direction:column;flex:1;gap:.8em}.workflow-builder-node-item__fields ::ng-deep mat-form-field{width:100%}.workflow-builder-node-item__footer{display:flex;flex-direction:column}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container{width:100%}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container button{width:inherit;background-color:#98ca71}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container .mdc-button__label{text-transform:uppercase}.workflow-builder-node-item__absolute-elements>*{position:absolute}.workflow-builder-node-item__absolute-elements__button-delete{--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 32px;overflow:hidden;top:0;right:0;padding:8px}.workflow-builder-node-item__absolute-elements__button-delete mat-icon{height:1em;width:1em;font-weight:600}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8$2.AzavistaButtonComponent, selector: "azavista-button", inputs: ["acl", "disabled", "cssClasses", "containerCssClasses"] }, { kind: "component", type: WorkflowBuilderNodeFormHeaderComponent, selector: "azavista-workflow-builder-node-form-header", inputs: ["editMode", "controllerData"], outputs: ["canvasChanges"] }, { kind: "component", type: WorkflowBuilderNodeFormFieldTextComponent, selector: "azavista-workflow-builder-node-form-field-text", inputs: ["property"] }, { kind: "component", type: WorkflowBuilderNodeFormFieldSelectComponent, selector: "azavista-workflow-builder-node-form-field-select", inputs: ["property"] }, { kind: "component", type: WorkflowBuilderNodeFormFieldToggleComponent, selector: "azavista-workflow-builder-node-form-field-toggle" }, { kind: "component", type: WorkflowBuilderNodeFormFieldProcessComponent, selector: "azavista-workflow-builder-node-form-field-process", inputs: ["property"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }], changeDetection: i0.ChangeDetectionStrategy.Default }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderNodeFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-node-form', providers: [...ngResizeObserverProviders], changeDetection: ChangeDetectionStrategy.Default, template: "<div\r\n  class=\"workflow-builder-node-item\"\r\n  *ngIf=\"workflowSettingsGroupedFieldData && canvasGroupFieldData\"\r\n>\r\n  <azavista-workflow-builder-node-form-header\r\n    #formHeader\r\n    [controllerData]=\"controllerData\"\r\n    (canvasChanges)=\"onUpdateCanvasFields($event)\"\r\n  ></azavista-workflow-builder-node-form-header>\r\n\r\n  <div class=\"workflow-builder-node-item__fields\">\r\n    <ng-container *ngIf=\"workflowSettingsGroupedFieldData.expandPanels\">\r\n      <ng-container\r\n        *ngFor=\"let property of properties; trackBy: trackByWorkflowProperty\"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"formGroup?.controls?.[property.attribute] as formControl\"\r\n        >\r\n          <azavista-workflow-builder-node-form-field-select\r\n            *ngIf=\"\r\n              property.type === 'select' || property.type === 'multiselect'\r\n            \"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"property\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-select>\r\n          <azavista-workflow-builder-node-form-field-text\r\n            *ngIf=\"property.type === 'text' || property.type === 'number'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-text>\r\n          <azavista-workflow-builder-node-form-field-toggle\r\n            *ngIf=\"property.type === 'boolean'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-toggle>\r\n          <azavista-workflow-builder-node-form-field-process\r\n            *ngIf=\"property.type === 'process'\"\r\n            [eventId]=\"eventId\"\r\n            [workflowId]=\"workflowId\"\r\n            [property]=\"$any(property)\"\r\n            [control]=\"$any(formControl)\"\r\n          >\r\n          </azavista-workflow-builder-node-form-field-process>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n  <div\r\n    class=\"workflow-builder-node-item__footer\"\r\n    *ngIf=\"workflowSettingsGroupedFieldData.fieldsWithEntity.fields.length > 0\"\r\n  >\r\n    <azavista-button (click)=\"toggleExpandPanels()\" color=\"primary\">{{\r\n      (workflowSettingsGroupedFieldData.expandPanels\r\n        ? \"CLOSE\"\r\n        : isWorkflowValid\r\n          ? \"OPEN\"\r\n          : \"SETUP\"\r\n      ) | translate\r\n    }}</azavista-button>\r\n  </div>\r\n  <div\r\n    class=\"workflow-builder-node-item__absolute-elements\">\r\n    <button *ngIf=\"!formHeader.editMode\" class=\"workflow-builder-node-item__absolute-elements__button-delete\" mat-icon-button (click)=\"removeNode.emit()\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n", styles: [":host{font-size:12px;display:flex;position:relative;width:100%;height:min-content;border:1px solid #ccc;background-color:#f5f4f5;border-radius:4px;padding:1em;box-sizing:border-box}:host ::ng-deep *,:host ::ng-deep .mat-mdc-slide-toggle .mdc-label{font-size:12px;font-family:var(--azavista-font)}:host ::ng-deep .mat-mdc-form-field-infix{min-height:36px}:host ::ng-deep .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}:host ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}:host ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}:host ::ng-deep .mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}:host ::ng-deep .mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:none}:host ::ng-deep .mat-mdc-form-field{background-color:#fff}:host ::ng-deep .mat-mdc-form-field .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}:host ::ng-deep .mat-mdc-form-field .mat-mdc-select-arrow-wrapper{display:none}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined:hover{background-color:transparent}:host ::ng-deep .mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:4px 0!important;min-height:auto}:host ::ng-deep .mat-mdc-form-field .mat-mdc-form-field-required-marker{color:var(--palette-warn-500)!important}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty label,:host ::ng-deep .mat-mdc-form-field.mat-focused label{display:none}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty .mdc-notched-outline__notch,:host ::ng-deep .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch{width:0px!important;padding:0}:host ::ng-deep .mat-mdc-form-field.mat-form-field-not-empty:not(.mat-form-field-invalid){--mdc-outlined-text-field-outline-color: #4caf50}.hidden.hidden[class]{display:none}.workflow-builder-node-item{display:flex;flex-direction:column;max-width:100%;width:100%;height:min-content;gap:.8em}.workflow-builder-node-item__fields{display:flex;flex-direction:column;flex:1;gap:.8em}.workflow-builder-node-item__fields ::ng-deep mat-form-field{width:100%}.workflow-builder-node-item__footer{display:flex;flex-direction:column}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container{width:100%}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container button{width:inherit;background-color:#98ca71}.workflow-builder-node-item__footer ::ng-deep .azavista-button-component.button-container .mdc-button__label{text-transform:uppercase}.workflow-builder-node-item__absolute-elements>*{position:absolute}.workflow-builder-node-item__absolute-elements__button-delete{--mdc-icon-button-icon-size: 16px;--mdc-icon-button-state-layer-size: 32px;overflow:hidden;top:0;right:0;padding:8px}.workflow-builder-node-item__absolute-elements__button-delete mat-icon{height:1em;width:1em;font-weight:600}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.AzavistaSharedService }, { type: i0.ElementRef }, { type: AzavistaWorkflowBuilderController }, { type: i3$1.NgResizeObserver }, { type: i0.NgZone }, { type: AzavistaWorkflowBuilderFormFieldService }]; }, propDecorators: { node: [{
                type: Input
            }], eventId: [{
                type: Input
            }], diagramEl: [{
                type: Input
            }], attrNodeId: [{
                type: HostBinding,
                args: ['attr.nodeId']
            }], workflowSettingsChanges: [{
                type: Output
            }], canvasChanges: [{
                type: Output
            }], removeNode: [{
                type: Output
            }], workflowSettingsGroupedFieldEl: [{
                type: ViewChild,
                args: ['workflowSettingsGroupedField', {
                        read: AzavistaGroupedFieldsComponent,
                    }]
            }], formHeader: [{
                type: ViewChild,
                args: ['formHeader']
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class WorkflowBuilderPaletteComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderPaletteComponent, deps: [{ token: i1$1.AzavistaSharedService }, { token: i0.NgZone }, { token: WorkflowBuilderService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderPaletteComponent, selector: "azavista-workflow-builder-workflow-builder-palette", host: { listeners: { "click": "onHostClick($event)" } }, ngImport: i0, template: "<mat-form-field>\n  <input #searchText matInput [placeholder]=\"'TYPE_TO_FILTER_BLOCKS' | translate\" />\n</mat-form-field>\n\n<ejs-symbolpalette\n  #symbolpalette\n  id=\"symbolpalette\"\n  [enableAnimation]=\"true\"\n  [expandMode]=\"expandMode\"\n  [palettes]=\"searchText.value| apply : getPalettesFromPaletteCategories | async\"\n  [getSymbolInfo]=\"getSymbolInfo\"\n>\n</ejs-symbolpalette>\n", styles: [":host{display:flex;flex-direction:column;position:relative;overflow:visible;font-size:12px;height:100%}:host ::ng-deep *{font-size:12px}.mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}mat-form-field{width:100%;padding:.5em 10px 1em;box-sizing:border-box}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper{background-color:#fff;border-radius:0!important}mat-form-field ::ng-deep .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:8px 0!important;min-height:auto}ejs-symbolpalette{display:block;position:relative;overflow:auto;margin-top:-4px}ejs-symbolpalette ::ng-deep .e-acrdn-header{display:flex;align-items:center;justify-content:space-between;background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6;border-radius:4px;padding:4px 10px;font-weight:500;color:#666;cursor:pointer}ejs-symbolpalette ::ng-deep .e-acrdn-content{min-height:2em}ejs-symbolpalette ::ng-deep .e-acrdn-content .e-symbol-draggable{cursor:grab}ejs-symbolpalette ::ng-deep .e-remove-palette{animation:.3s;overflow:hidden}ejs-symbolpalette ::ng-deep .e-toggle-icon{animation:.3s}ejs-symbolpalette ::ng-deep .e-tgl-collapse-icon.e-icons:before{font-family:Material Icons;content:\"\\e5c7\";font-size:2em;line-height:1em;animation:.3s}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-toggle-icon{transform:rotate(180deg)}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-remove-palette{height:0px;opacity:0}::ng-deep .e-symbol-draggable>canvas{background-color:#fff}::ng-deep .e-html-layer{border-radius:2px;box-shadow:0 0 2px #0000009c}::ng-deep .palette-item{box-sizing:border-box;display:flex;flex-direction:column;gap:4px;position:relative;width:100%;height:100%;padding:2px 4px;align-items:center;justify-content:space-evenly}::ng-deep .palette-item__inner{display:block;position:relative;width:40px;height:40px;border-radius:4px;align-items:center;box-sizing:border-box;color:transparent}::ng-deep .palette-item__title{font-size:10px;text-align:center;margin:0 auto}::ng-deep .palette-item__icon{color:#a6a6a6;font-size:40px;margin:auto;position:absolute}::ng-deep .palette-item__input,::ng-deep .palette-item__output,::ng-deep .palette-item__decline-input,::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-input,::ng-deep .palette-item__cancellation-output{display:block;border-radius:50%;background-color:#fff;border:1px solid #a6a6a6;height:4.9px;width:4.9px;position:absolute;top:50%;transform:translateY(-50%)}::ng-deep .palette-item__input{left:2px}::ng-deep .palette-item__output{border-color:#bbb;right:0}::ng-deep .palette-item__decline-input,::ng-deep .palette-item__cancellation-input{top:4px;left:50%;transform:translateY(-50%) translate(-40%)}::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-output{top:100%;left:50%;transform:translateY(-100%) translate(-50%)}::ng-deep #create-work-block_container{pointer-events:none;opacity:.5}mat-expansion-panel{border:none!important;background:transparent;box-shadow:none!important;margin:0}mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}.mat-expansion-panel-header{background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6}\n"], dependencies: [{ kind: "component", type: i5$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5$2.SymbolPaletteComponent, selector: "ejs-symbolpalette", inputs: ["accessKey", "allowDrag", "connectorDefaults", "enableAnimation", "enablePersistence", "enableRtl", "enableSearch", "expandMode", "filterSymbols", "getConnectorDefaults", "getNodeDefaults", "getSymbolInfo", "getSymbolTemplate", "height", "ignoreSymbolsOnSearch", "locale", "nodeDefaults", "palettes", "symbolDragSize", "symbolHeight", "symbolInfo", "symbolMargin", "symbolPreview", "symbolWidth", "width"], outputs: ["paletteExpanding", "paletteSelectionChange"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }, { kind: "pipe", type: ApplyFunctionPipe, name: "apply" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder-workflow-builder-palette', template: "<mat-form-field>\n  <input #searchText matInput [placeholder]=\"'TYPE_TO_FILTER_BLOCKS' | translate\" />\n</mat-form-field>\n\n<ejs-symbolpalette\n  #symbolpalette\n  id=\"symbolpalette\"\n  [enableAnimation]=\"true\"\n  [expandMode]=\"expandMode\"\n  [palettes]=\"searchText.value| apply : getPalettesFromPaletteCategories | async\"\n  [getSymbolInfo]=\"getSymbolInfo\"\n>\n</ejs-symbolpalette>\n", styles: [":host{display:flex;flex-direction:column;position:relative;overflow:visible;font-size:12px;height:100%}:host ::ng-deep *{font-size:12px}.mat-mdc-form-field-infix{min-height:36px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:18px}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY( -24.75px) scale(var(--mat-mdc-form-field-floating-label-scale, .75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix{padding-top:6px;padding-bottom:6px}.mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-floating-label{display:none}mat-form-field{width:100%;padding:.5em 10px 1em;box-sizing:border-box}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper{background-color:#fff;border-radius:0!important}mat-form-field ::ng-deep .mat-mdc-form-field-flex{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined{height:auto!important;max-height:unset!important}mat-form-field ::ng-deep .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding:8px 0!important;min-height:auto}ejs-symbolpalette{display:block;position:relative;overflow:auto;margin-top:-4px}ejs-symbolpalette ::ng-deep .e-acrdn-header{display:flex;align-items:center;justify-content:space-between;background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6;border-radius:4px;padding:4px 10px;font-weight:500;color:#666;cursor:pointer}ejs-symbolpalette ::ng-deep .e-acrdn-content{min-height:2em}ejs-symbolpalette ::ng-deep .e-acrdn-content .e-symbol-draggable{cursor:grab}ejs-symbolpalette ::ng-deep .e-remove-palette{animation:.3s;overflow:hidden}ejs-symbolpalette ::ng-deep .e-toggle-icon{animation:.3s}ejs-symbolpalette ::ng-deep .e-tgl-collapse-icon.e-icons:before{font-family:Material Icons;content:\"\\e5c7\";font-size:2em;line-height:1em;animation:.3s}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-toggle-icon{transform:rotate(180deg)}ejs-symbolpalette ::ng-deep .e-acrdn-item.e-acrdn-item--hide-content .e-remove-palette{height:0px;opacity:0}::ng-deep .e-symbol-draggable>canvas{background-color:#fff}::ng-deep .e-html-layer{border-radius:2px;box-shadow:0 0 2px #0000009c}::ng-deep .palette-item{box-sizing:border-box;display:flex;flex-direction:column;gap:4px;position:relative;width:100%;height:100%;padding:2px 4px;align-items:center;justify-content:space-evenly}::ng-deep .palette-item__inner{display:block;position:relative;width:40px;height:40px;border-radius:4px;align-items:center;box-sizing:border-box;color:transparent}::ng-deep .palette-item__title{font-size:10px;text-align:center;margin:0 auto}::ng-deep .palette-item__icon{color:#a6a6a6;font-size:40px;margin:auto;position:absolute}::ng-deep .palette-item__input,::ng-deep .palette-item__output,::ng-deep .palette-item__decline-input,::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-input,::ng-deep .palette-item__cancellation-output{display:block;border-radius:50%;background-color:#fff;border:1px solid #a6a6a6;height:4.9px;width:4.9px;position:absolute;top:50%;transform:translateY(-50%)}::ng-deep .palette-item__input{left:2px}::ng-deep .palette-item__output{border-color:#bbb;right:0}::ng-deep .palette-item__decline-input,::ng-deep .palette-item__cancellation-input{top:4px;left:50%;transform:translateY(-50%) translate(-40%)}::ng-deep .palette-item__decline-output,::ng-deep .palette-item__cancellation-output{top:100%;left:50%;transform:translateY(-100%) translate(-50%)}::ng-deep #create-work-block_container{pointer-events:none;opacity:.5}mat-expansion-panel{border:none!important;background:transparent;box-shadow:none!important;margin:0}mat-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0}.mat-expansion-panel-header{background-color:#fff!important;margin:0 10px;border:1px solid #a6a6a6}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.AzavistaSharedService }, { type: i0.NgZone }, { type: WorkflowBuilderService }]; }, propDecorators: { onHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/* eslint-disable @typescript-eslint/ban-ts-comment */
const ZOOM_FACTOR_OPTIONS = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
];
class WorkflowBuilderComponent {
    constructor(builderSvc, controller, host, resize$, sharedSvc) {
        this.builderSvc = builderSvc;
        this.controller = controller;
        this.host = host;
        this.resize$ = resize$;
        this.sharedSvc = sharedSvc;
        /** Fill this to use custom dataProvider */
        this.dataProvider = this.builderSvc.dataProvider;
        this.debugMode = false;
        this.diagramConfig = {
            constraints: DiagramConstraints.Default,
            snapSettings: {
                constraints: SnapConstraints.SnapToObject,
            },
            getConnectorDefaults: () => DEFAULT_CONNECTOR,
            drawingObject: { ...DEFAULT_CONNECTOR },
        };
        this.tool = DiagramTools.SingleSelect | DiagramTools.ZoomPan;
        this.paletteConfig = {
            palettes: [],
            getSymbolInfo: () => { },
        };
        this.isInitialized = false;
        this.zoomOptions = ZOOM_FACTOR_OPTIONS;
        this.currentZoomFactor = 1;
        this.hasNodeSelectedAndExpanded = (selectedNodes) => {
            const selectedNodeMap = getMapByValue(selectedNodes, 'id');
            return !!this.nodeForms?.some((node) => !!selectedNodeMap[node.node.id] &&
                (!!node.formHeader?.editMode ||
                    !!node.workflowSettingsGroupedFieldData?.expandPanels));
        };
        this.areWorkflowsValid = (validityMap) => {
            return Object.values(validityMap).every((isValid) => isValid);
        };
    }
    async ngOnInit() {
        this.controller.isDebugCallback = () => this.debugMode;
        if (this.dataProvider) {
            this.builderSvc.dataProvider = this.dataProvider;
        }
        if (!this.eventId) {
            throw new Error('Please assign eventId to WorkflowBuilderComponent');
        }
    }
    async ngAfterViewInit() {
        await delay(0); // delay to wait until html is fully rendered
        this.resize$.pipe(startWith(), debounceTime(100)).subscribe(() => {
            this.updateDiagramSize();
        });
    }
    async onDiagramLoad() {
        await this.controller.initFromProvider(this.dataProvider, this.eventId);
        const { connectors, nodes } = getNodeAndConnectorsFromCanvasControllerData(Object.values(this.controller.dataMap));
        nodes.forEach((node) => this.diagramEl.addNode({
            ...node,
            shape: {
                type: 'HTML',
            },
            style: {
                fill: 'blue',
            },
        }));
        connectors.forEach((connector) => this.diagramEl.addConnector(connector));
        this.log('onDiagramLoad - controller.dataMap', this.controller.dataMap, nodes, connectors);
        this.diagramEl.pan(0, 0);
    }
    async onPublish() {
        this.log('onPublish', this.controller.getCurrentState());
        this.controller.publish();
    }
    log(logName, ...params) {
        if (this.debugMode) {
            console.groupCollapsed(logName);
            console.trace(params);
            console.groupEnd();
        }
    }
    getSymbolInfo(symbol) {
        // Defines the symbol description
        return {
            width: 75,
            height: 40,
            description: { text: symbol.addInfo['description'] },
        };
    }
    onConnectionPointChange(event) {
        this.log('connectionPointChange', event);
        const { connector, state } = event;
        if (state !== 'Completed') {
            return;
        }
        this.handleConnectorPorts(connector);
    }
    async onElementDraw(event) {
        this.log('elementDraw', event);
        const { objectType, state } = event;
        if (state === 'Start') {
            // this is required to remove the selection-border that causes the connector to lose its sourceId
            this.diagramEl.unSelect(event.source);
        }
        if (state !== 'Completed') {
            return;
        }
        switch (objectType) {
            case 'Connector': {
                const connectorEvent = event;
                return this.onConnectionAddedByDrawing(connectorEvent.source);
            }
        }
    }
    async onCollectionChange(event) {
        this.log('collectionChange', event);
        const { type, state, element } = event;
        if (state !== 'Changed') {
            return;
        }
        if (element instanceof Node) {
            switch (type) {
                case 'Addition': {
                    await delay(300);
                    this.onDropPalette(element);
                    break;
                }
                case 'Removal': {
                    this.deleteWorkflow(getWorkflowIdFromNodeId(element.id));
                    break;
                }
            }
        }
        if (element instanceof Connector) {
            switch (type) {
                case 'Removal': {
                    const sourceWorkflowId = getWorkflowIdFromNodeId(element.sourceID);
                    const targetWorkflowId = getWorkflowIdFromNodeId(element.targetID);
                    const elementConnector = element;
                    const sourceWorkflow = this.controller.dataMap[sourceWorkflowId];
                    const outputPin = getOutputPinFromConnector(elementConnector);
                    if (targetWorkflowId ===
                        sourceWorkflow?.factory.getNextWorkflows()[outputPin]) {
                        this.controller.updateWorkflowNextWorkflow(outputPin, sourceWorkflowId, null);
                    }
                    break;
                }
                case 'Addition': {
                    break;
                }
            }
        }
    }
    async onSelectionChange(event) {
        this.log('selectionChange', event);
        const { state } = event;
        if (state !== 'Changed') {
            return;
        }
        // handle connectors selection indicator
        const selectedConnectorsMaps = getMapByValue(this.diagramEl.selectedItems.connectors ?? [], 'id');
        this.diagramEl.connectors.forEach((item) => {
            const selectedStrokeWidth = DEFAULT_STROKE_WIDTH * 2;
            const isSelectedItem = !!selectedConnectorsMaps[item.id];
            if (item.style?.strokeWidth) {
                if (item.style.strokeWidth !== DEFAULT_STROKE_WIDTH &&
                    !isSelectedItem) {
                    item.style.strokeWidth = DEFAULT_STROKE_WIDTH;
                }
                if (item.style.strokeWidth !== selectedStrokeWidth &&
                    isSelectedItem) {
                    item.style.strokeWidth = selectedStrokeWidth;
                }
            }
        });
        // make selected node on top of z-index
        const selectedNodesMaps = getMapByValue(this.diagramEl.selectedItems.nodes ?? [], 'id');
        this.diagramEl.nodes.forEach((item) => {
            const isSelectedItem = !!selectedNodesMaps[item.id];
            const nodeElement = this.host.nativeElement.querySelector(`#${item.id}_content_html_element`);
            if (nodeElement) {
                nodeElement.classList.toggle('diagram-node__selected', isSelectedItem);
            }
        });
    }
    onScrollChange(event) {
        this.log('onScrollChange', event);
        this.currentZoomFactor = event.newValue.CurrentZoom;
    }
    deleteWorkflow(workflowId) {
        this.controller.deleteWorkflow(workflowId);
    }
    /** Handle when dragging the tip end/start of a connector */
    async onConnectionChange(event) {
        this.log('connectionChange', event);
        const { state, newValue, oldValue, connectorEnd, connector } = event;
        if (state !== 'Changed') {
            return;
        }
        // @ts-ignore
        const newValueNodeId = newValue.nodeId;
        // @ts-ignore
        const oldValueNodeId = oldValue.nodeId;
        const connectorModel = connector;
        const outputPin = getOutputPinFromConnector(connectorModel);
        if (newValueNodeId != null &&
            oldValueNodeId != null &&
            newValueNodeId !== oldValueNodeId) {
            if (connectorEnd === 'ConnectorSourceEnd') {
                const oldWorkflowSourceId = getWorkflowIdFromNodeId(oldValueNodeId);
                const newWorkflowSourceId = getWorkflowIdFromNodeId(newValueNodeId);
                const newWorkflowTargetId = connector.targetID
                    ? getWorkflowIdFromNodeId(connector.targetID)
                    : null;
                const isValidNextWorkflow = this.controller.isValidNextWorkflow(outputPin, newWorkflowSourceId, newWorkflowTargetId);
                if (isValidNextWorkflow) {
                    this.controller.updateWorkflowNextWorkflow(outputPin, oldWorkflowSourceId, null);
                    if (newValueNodeId) {
                        this.controller.updateWorkflowNextWorkflow(outputPin, newWorkflowSourceId, newWorkflowTargetId);
                    }
                }
                else {
                    connector.sourceID = oldValueNodeId;
                }
            }
            if (connectorEnd === 'ConnectorTargetEnd' &&
                connector.sourceID?.startsWith(PREFIX_NODE)) {
                const workflowSourceId = getWorkflowIdFromNodeId(connector.sourceID);
                const newWorkflowTargetId = newValueNodeId
                    ? getWorkflowIdFromNodeId(newValueNodeId)
                    : null;
                const isValidNextWorkflow = this.controller.isValidNextWorkflow(outputPin, workflowSourceId, newWorkflowTargetId);
                if (isValidNextWorkflow) {
                    this.controller.updateWorkflowNextWorkflow(outputPin, workflowSourceId, newWorkflowTargetId);
                }
                else {
                    connector.targetID = oldValueNodeId;
                }
            }
        }
        this.checkConnector(connector.id);
    }
    async onDropPalette(node) {
        const paletteAddInfo = node?.addInfo;
        if (workflowTypeArray.includes(paletteAddInfo?.type)) {
            const newControllerData = this.controller.addWorkflow(paletteAddInfo?.type, {
                coordinate: {
                    x: node.offsetX,
                    y: node.offsetY,
                },
                name: this.sharedSvc.translate(WORKFLOW_NAME_TRANSLATIONS[paletteAddInfo.type]),
                description: this.sharedSvc.translate(WORKFLOW_EXPLANATION_TRANSLATIONS[paletteAddInfo.type]),
            });
            const newNodeData = getNodeFromCanvasControllerData(newControllerData);
            this.diagramEl.addNode(newNodeData);
            this.diagramEl.remove(node);
        }
    }
    onPositionChange(event) {
        this.log('positionChange', event);
        const { state, newValue, source } = event;
        if (state !== 'Completed') {
            return;
        }
        const sourceNode = source;
        if (sourceNode?.id?.startsWith(PREFIX_NODE)) {
            this.controller.updateWorkflowCoordinate(getWorkflowIdFromNodeId(sourceNode.id), {
                x: newValue.offsetX,
                y: newValue.offsetY,
            });
        }
    }
    async onConnectionAddedByDrawing(connector) {
        this.log('onConnectionAddedByDrawing', connector);
        const workflowSourceId = getWorkflowIdFromNodeId(connector.sourceID);
        const workflowTargetId = getWorkflowIdFromNodeId(connector.targetID);
        const connectorModel = connector;
        const outputPin = getOutputPinFromConnector(connectorModel);
        const isValidNextWorkflow = this.controller.isValidNextWorkflow(outputPin, workflowSourceId, workflowTargetId, true);
        if (isValidNextWorkflow) {
            this.controller.updateWorkflowNextWorkflow(outputPin, workflowSourceId, workflowTargetId);
        }
        else {
            await delay(300);
            this.diagramEl.remove(connector);
        }
        this.checkConnector(connector.id);
    }
    checkConnector(connectorId) {
        const connector = this.diagramEl.connectors.find(({ id }) => id === connectorId);
        if (!connector) {
            return;
        }
        connector.style = {
            ...connector.style,
            strokeColor: connector.sourceID &&
                connector.targetID &&
                connector.sourceID !== connector.targetID
                ? DEFAULT_STROKE_COLOR
                : DEFAULT_ERROR_STROKE_COLOR,
        };
        const connectorInstance = connector;
        const connectorModel = connector;
        const outputPin = getOutputPinFromConnector(connectorModel);
        connectorInstance.constraints =
            ConnectorConstraints.Default - ConnectorConstraints.DragSourceEnd;
        if (connectorInstance.annotations?.[0]) {
            connectorInstance.annotations[0].content =
                getConnectorAnnotation(outputPin)[0].content;
        }
        else {
            this.diagramEl.addConnectorLabels(connector, getConnectorAnnotation(outputPin));
        }
        this.handleConnectorPorts(connectorInstance);
        this.diagramEl.dataBind();
    }
    handleConnectorPorts(connector) {
        const connectorModel = connector;
        const outputPin = getOutputPinFromConnector(connectorModel);
        if (outputPin &&
            connectorModel.sourceID &&
            !connectorModel.sourcePortID) {
            connectorModel.sourcePortID = `${PREFIX_PORT}_${outputPin}_pin`;
        }
        if (outputPin &&
            connectorModel.targetID &&
            !connectorModel.targetPortID) {
            connectorModel.targetPortID = `${PREFIX_PORT}_${OUTPUT_PIN_PAIR[outputPin]}_pin`;
        }
    }
    updateWorkflowSettings(nodeId, data) {
        if (data?.obj) {
            this.controller.updateWorkflowSettings(getWorkflowIdFromNodeId(nodeId), data.obj);
        }
    }
    updateWorkflowCanvas(nodeId, data) {
        this.controller.updateWorkflowCanvas(getWorkflowIdFromNodeId(nodeId), data);
    }
    deleteNode(nodeModel) {
        const nodeInstance = this.diagramEl.nodes.find(({ id }) => id === nodeModel.id);
        nodeInstance.constraints = NodeConstraints.Default;
        this.diagramEl.remove(nodeInstance);
    }
    async updateDiagramSize() {
        const rect = this.host.nativeElement
            .querySelector('ejs-diagram')
            ?.getBoundingClientRect();
        this.diagramConfig.height = rect?.height;
        this.diagramConfig.width = rect?.width;
    }
    saveState() {
        // TODO
    }
    hasNodeSelectedAndExpanded2() {
        const selectedNodeMap = getMapByValue(this.diagramEl?.selectedItems.nodes ?? [], 'id');
        return !!this.nodeForms?.some((node) => !!selectedNodeMap[node.node.id] &&
            !!node.workflowSettingsGroupedFieldData?.expandPanels);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderComponent, deps: [{ token: WorkflowBuilderService }, { token: AzavistaWorkflowBuilderController }, { token: i0.ElementRef }, { token: i3$1.NgResizeObserver }, { token: i1$1.AzavistaSharedService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.10", type: WorkflowBuilderComponent, selector: "azavista-workflow-builder", inputs: { dataProvider: "dataProvider", eventId: "eventId", debugMode: "debugMode" }, providers: [...ngResizeObserverProviders], viewQueries: [{ propertyName: "diagramEl", first: true, predicate: ["diagram"], descendants: true }, { propertyName: "nodeForms", predicate: WorkflowBuilderNodeFormComponent, descendants: true }], ngImport: i0, template: "<div class=\"workflow-builder-div\">\r\n  <div class=\"workflow-builder-div__diagram-area\">\r\n    <div class=\"workflow-builder-div__diagram-area__toolbar\">\r\n      <div class=\"workflow-builder-div__diagram-area__toolbar__left\">\r\n        <azavista-button\r\n          [disabled]=\"!(controller.validityMap| apply : areWorkflowsValid)\"\r\n          (click)=\"onPublish()\"\r\n          color=\"primary\">{{\r\n          \"PUBLISH\" | translate\r\n        }}</azavista-button>\r\n      </div>\r\n      <div class=\"workflow-builder-div__diagram-area__toolbar__right\">\r\n        <mat-select\r\n          [value]=\"1\"\r\n          (selectionChange)=\"diagram.zoom($event.value / currentZoomFactor)\"\r\n          class=\"workflow-builder-div__diagram-area__toolbar__tool-zoom\"\r\n        >\r\n          <mat-option class=\"workflow-builder-div__diagram-area__toolbar__tool-zoom__option\" *ngFor=\"let factor of zoomOptions\" [value]=\"factor\"\r\n            >{{ factor * 100 }} %</mat-option\r\n          >\r\n        </mat-select>\r\n      </div>\r\n    </div>\r\n    <ejs-diagram\r\n      #diagram\r\n      id=\"diagram\"\r\n      [width]=\"diagramConfig.width\"\r\n      [height]=\"diagramConfig.height\"\r\n      [tool]=\"tool\"\r\n      [tooltip]=\"diagramConfig.tooltip\"\r\n      [constraints]=\"diagramConfig.constraints\"\r\n      [snapSettings]=\"diagramConfig.snapSettings\"\r\n      [getConnectorDefaults]=\"diagramConfig.getConnectorDefaults\"\r\n      [class.ejs-diagram--has-node-selected]=\"\r\n        diagram.selectedItems.nodes && diagram.selectedItems.nodes.length > 0\r\n      \"\r\n      [class.ejs-diagram--has-node-selected-and-expanded]=\"\r\n        hasNodeSelectedAndExpanded2()\r\n      \"\r\n      (created)=\"onDiagramLoad()\"\r\n      (connectionChange)=\"onConnectionChange($event)\"\r\n      (elementDraw)=\"onElementDraw($event)\"\r\n      (commandExecute)=\"log('commandExecute', $event)\"\r\n      (created)=\"log('created', $event)\"\r\n      (dataLoaded)=\"log('dataLoaded', $event)\"\r\n      (dragEnter)=\"log('dragEnter', $event)\"\r\n      (dragLeave)=\"log('dragLeave', $event)\"\r\n      (dragOver)=\"log('dragOver', $event)\"\r\n      (drop)=\"log('drop', $event)\"\r\n      (fixedUserHandleClick)=\"log('fixedUserHandleClick', $event)\"\r\n      (load)=\"log('load', $event)\"\r\n      (positionChange)=\"onPositionChange($event)\"\r\n      (propertyChange)=\"log('propertyChange', $event)\"\r\n      (rotateChange)=\"log('rotateChange', $event)\"\r\n      (scrollChange)=\"onScrollChange($event)\"\r\n      (segmentChange)=\"log('segmentChange', $event)\"\r\n      (segmentCollectionChange)=\"log('segmentCollectionChange', $event)\"\r\n      (selectionChange)=\"onSelectionChange($event)\"\r\n      (sizeChange)=\"log('sizeChange', $event)\"\r\n      (sourcePointChange)=\"onConnectionPointChange($event)\"\r\n      (targetPointChange)=\"onConnectionPointChange($event)\"\r\n      (collectionChange)=\"onCollectionChange($event)\"\r\n    >\r\n      <ng-template #nodeTemplate let-data>\r\n        <azavista-workflow-builder-node-form\r\n          [node]=\"data\"\r\n          [diagramEl]=\"diagramEl\"\r\n          [eventId]=\"eventId\"\r\n          (workflowSettingsChanges)=\"updateWorkflowSettings(data.id, $event)\"\r\n          (canvasChanges)=\"updateWorkflowCanvas(data.id, $event)\"\r\n          (removeNode)=\"deleteNode(data)\"\r\n        ></azavista-workflow-builder-node-form>\r\n      </ng-template>\r\n    </ejs-diagram>\r\n  </div>\r\n  <div class=\"workflow-builder-div__palette-area\">\r\n    <mat-tab-group>\r\n      <mat-tab label=\"{{ 'WORK_BLOCKS' | translate }}\">\r\n        <azavista-workflow-builder-workflow-builder-palette></azavista-workflow-builder-workflow-builder-palette>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;position:relative;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit;height:inherit;width:inherit}:host ::ng-deep *{font-size:12px}.workflow-builder-div{display:flex;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit;height:inherit}.workflow-builder-div__diagram-area{display:flex;flex-direction:column;width:calc(100% - 256px);height:inherit;overflow:hidden;padding:2px;gap:4px}.workflow-builder-div__diagram-area__toolbar{display:flex;align-items:center;justify-content:space-between;height:var(--mdc-secondary-navigation-tab-container-height);padding:0 24px;border:none;margin:5px 0}.workflow-builder-div__diagram-area__toolbar__tool-zoom{border-radius:8px;border:2px solid #777;padding:2px 6px}.workflow-builder-div__palette-area{max-height:inherit;overflow-y:auto;width:256px;padding:2px}mat-tab-group{max-height:100%;height:100%}mat-tab-group ::ng-deep .mat-mdc-tab-body-wrapper{height:100%;overflow:hidden}mat-tab-group ::ng-deep .mat-mdc-tab-body.mat-mdc-tab-body-active,mat-tab-group ::ng-deep .mat-mdc-tab-body-content{overflow:hidden}::ng-deep .mat-mdc-tab-header{margin-bottom:0}ejs-diagram{display:block;flex:1 1 auto;height:auto!important;width:auto!important;max-width:100%;box-shadow:0 0 2px #0000009c;border-radius:4px;background-color:#fbfbfb}ejs-diagram.ejs-diagram--has-node-selected-and-expanded ::ng-deep #diagram_htmlLayer{z-index:1}::ng-deep .e-tooltip-wrap{display:none}::ng-deep [class].diagram-node__selected{z-index:99999999}::ng-deep [class].diagram-node__ineligible{opacity:.5}::ng-deep div[id^=node_][id$=_content_html_element]>div{overflow-y:auto}::ng-deep .workflow-builder-div__diagram-area__toolbar__tool-zoom__option.mat-mdc-option{font-size:12px}::ng-deep .workflow-builder-div__diagram-area__toolbar__tool-zoom__option.mat-mdc-option .mdc-list-item__primary-text{white-space:pre;text-align:right;min-width:max-content}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i8$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "panelWidth", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i9.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "component", type: i8$3.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i8$3.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "component", type: i5$2.DiagramComponent, selector: "ejs-diagram", inputs: ["addInfo", "annotationTemplate", "backgroundColor", "bridgeDirection", "commandManager", "connectorDefaults", "connectors", "constraints", "contextMenuSettings", "customCursor", "dataSourceSettings", "diagramSettings", "drawingObject", "enableConnectorSplit", "enablePersistence", "enableRtl", "getConnectorDefaults", "getCustomCursor", "getCustomProperty", "getCustomTool", "getDescription", "getNodeDefaults", "height", "historyManager", "layers", "layout", "locale", "mode", "nodeDefaults", "nodeTemplate", "nodes", "pageSettings", "rulerSettings", "scrollSettings", "segmentThumbShape", "selectedItems", "serializationSettings", "setNodeTemplate", "snapSettings", "tool", "tooltip", "updateSelection", "userHandleTemplate", "width"], outputs: ["animationComplete", "click", "collectionChange", "commandExecute", "connectionChange", "contextMenuBeforeItemRender", "contextMenuClick", "contextMenuOpen", "created", "dataLoaded", "doubleClick", "dragEnter", "dragLeave", "dragOver", "drop", "expandStateChange", "fixedUserHandleClick", "historyChange", "historyStateChange", "keyDown", "keyUp", "load", "mouseEnter", "mouseLeave", "mouseOver", "mouseWheel", "onImageLoad", "onUserHandleMouseDown", "onUserHandleMouseEnter", "onUserHandleMouseLeave", "onUserHandleMouseUp", "positionChange", "propertyChange", "rotateChange", "scrollChange", "segmentChange", "segmentCollectionChange", "selectionChange", "sizeChange", "sourcePointChange", "targetPointChange", "textEdit", "elementDraw"] }, { kind: "component", type: i8$2.AzavistaButtonComponent, selector: "azavista-button", inputs: ["acl", "disabled", "cssClasses", "containerCssClasses"] }, { kind: "component", type: WorkflowBuilderPaletteComponent, selector: "azavista-workflow-builder-workflow-builder-palette" }, { kind: "component", type: WorkflowBuilderNodeFormComponent, selector: "azavista-workflow-builder-node-form", inputs: ["node", "eventId", "diagramEl"], outputs: ["workflowSettingsChanges", "canvasChanges", "removeNode"] }, { kind: "pipe", type: i3.TranslatePipe, name: "translate" }, { kind: "pipe", type: ApplyFunctionPipe, name: "apply" }], changeDetection: i0.ChangeDetectionStrategy.Default }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: WorkflowBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'azavista-workflow-builder', changeDetection: ChangeDetectionStrategy.Default, providers: [...ngResizeObserverProviders], template: "<div class=\"workflow-builder-div\">\r\n  <div class=\"workflow-builder-div__diagram-area\">\r\n    <div class=\"workflow-builder-div__diagram-area__toolbar\">\r\n      <div class=\"workflow-builder-div__diagram-area__toolbar__left\">\r\n        <azavista-button\r\n          [disabled]=\"!(controller.validityMap| apply : areWorkflowsValid)\"\r\n          (click)=\"onPublish()\"\r\n          color=\"primary\">{{\r\n          \"PUBLISH\" | translate\r\n        }}</azavista-button>\r\n      </div>\r\n      <div class=\"workflow-builder-div__diagram-area__toolbar__right\">\r\n        <mat-select\r\n          [value]=\"1\"\r\n          (selectionChange)=\"diagram.zoom($event.value / currentZoomFactor)\"\r\n          class=\"workflow-builder-div__diagram-area__toolbar__tool-zoom\"\r\n        >\r\n          <mat-option class=\"workflow-builder-div__diagram-area__toolbar__tool-zoom__option\" *ngFor=\"let factor of zoomOptions\" [value]=\"factor\"\r\n            >{{ factor * 100 }} %</mat-option\r\n          >\r\n        </mat-select>\r\n      </div>\r\n    </div>\r\n    <ejs-diagram\r\n      #diagram\r\n      id=\"diagram\"\r\n      [width]=\"diagramConfig.width\"\r\n      [height]=\"diagramConfig.height\"\r\n      [tool]=\"tool\"\r\n      [tooltip]=\"diagramConfig.tooltip\"\r\n      [constraints]=\"diagramConfig.constraints\"\r\n      [snapSettings]=\"diagramConfig.snapSettings\"\r\n      [getConnectorDefaults]=\"diagramConfig.getConnectorDefaults\"\r\n      [class.ejs-diagram--has-node-selected]=\"\r\n        diagram.selectedItems.nodes && diagram.selectedItems.nodes.length > 0\r\n      \"\r\n      [class.ejs-diagram--has-node-selected-and-expanded]=\"\r\n        hasNodeSelectedAndExpanded2()\r\n      \"\r\n      (created)=\"onDiagramLoad()\"\r\n      (connectionChange)=\"onConnectionChange($event)\"\r\n      (elementDraw)=\"onElementDraw($event)\"\r\n      (commandExecute)=\"log('commandExecute', $event)\"\r\n      (created)=\"log('created', $event)\"\r\n      (dataLoaded)=\"log('dataLoaded', $event)\"\r\n      (dragEnter)=\"log('dragEnter', $event)\"\r\n      (dragLeave)=\"log('dragLeave', $event)\"\r\n      (dragOver)=\"log('dragOver', $event)\"\r\n      (drop)=\"log('drop', $event)\"\r\n      (fixedUserHandleClick)=\"log('fixedUserHandleClick', $event)\"\r\n      (load)=\"log('load', $event)\"\r\n      (positionChange)=\"onPositionChange($event)\"\r\n      (propertyChange)=\"log('propertyChange', $event)\"\r\n      (rotateChange)=\"log('rotateChange', $event)\"\r\n      (scrollChange)=\"onScrollChange($event)\"\r\n      (segmentChange)=\"log('segmentChange', $event)\"\r\n      (segmentCollectionChange)=\"log('segmentCollectionChange', $event)\"\r\n      (selectionChange)=\"onSelectionChange($event)\"\r\n      (sizeChange)=\"log('sizeChange', $event)\"\r\n      (sourcePointChange)=\"onConnectionPointChange($event)\"\r\n      (targetPointChange)=\"onConnectionPointChange($event)\"\r\n      (collectionChange)=\"onCollectionChange($event)\"\r\n    >\r\n      <ng-template #nodeTemplate let-data>\r\n        <azavista-workflow-builder-node-form\r\n          [node]=\"data\"\r\n          [diagramEl]=\"diagramEl\"\r\n          [eventId]=\"eventId\"\r\n          (workflowSettingsChanges)=\"updateWorkflowSettings(data.id, $event)\"\r\n          (canvasChanges)=\"updateWorkflowCanvas(data.id, $event)\"\r\n          (removeNode)=\"deleteNode(data)\"\r\n        ></azavista-workflow-builder-node-form>\r\n      </ng-template>\r\n    </ejs-diagram>\r\n  </div>\r\n  <div class=\"workflow-builder-div__palette-area\">\r\n    <mat-tab-group>\r\n      <mat-tab label=\"{{ 'WORK_BLOCKS' | translate }}\">\r\n        <azavista-workflow-builder-workflow-builder-palette></azavista-workflow-builder-workflow-builder-palette>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n", styles: [":host{display:block;position:relative;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit;height:inherit;width:inherit}:host ::ng-deep *{font-size:12px}.workflow-builder-div{display:flex;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit;height:inherit}.workflow-builder-div__diagram-area{display:flex;flex-direction:column;width:calc(100% - 256px);height:inherit;overflow:hidden;padding:2px;gap:4px}.workflow-builder-div__diagram-area__toolbar{display:flex;align-items:center;justify-content:space-between;height:var(--mdc-secondary-navigation-tab-container-height);padding:0 24px;border:none;margin:5px 0}.workflow-builder-div__diagram-area__toolbar__tool-zoom{border-radius:8px;border:2px solid #777;padding:2px 6px}.workflow-builder-div__palette-area{max-height:inherit;overflow-y:auto;width:256px;padding:2px}mat-tab-group{max-height:100%;height:100%}mat-tab-group ::ng-deep .mat-mdc-tab-body-wrapper{height:100%;overflow:hidden}mat-tab-group ::ng-deep .mat-mdc-tab-body.mat-mdc-tab-body-active,mat-tab-group ::ng-deep .mat-mdc-tab-body-content{overflow:hidden}::ng-deep .mat-mdc-tab-header{margin-bottom:0}ejs-diagram{display:block;flex:1 1 auto;height:auto!important;width:auto!important;max-width:100%;box-shadow:0 0 2px #0000009c;border-radius:4px;background-color:#fbfbfb}ejs-diagram.ejs-diagram--has-node-selected-and-expanded ::ng-deep #diagram_htmlLayer{z-index:1}::ng-deep .e-tooltip-wrap{display:none}::ng-deep [class].diagram-node__selected{z-index:99999999}::ng-deep [class].diagram-node__ineligible{opacity:.5}::ng-deep div[id^=node_][id$=_content_html_element]>div{overflow-y:auto}::ng-deep .workflow-builder-div__diagram-area__toolbar__tool-zoom__option.mat-mdc-option{font-size:12px}::ng-deep .workflow-builder-div__diagram-area__toolbar__tool-zoom__option.mat-mdc-option .mdc-list-item__primary-text{white-space:pre;text-align:right;min-width:max-content}\n"] }]
        }], ctorParameters: function () { return [{ type: WorkflowBuilderService }, { type: AzavistaWorkflowBuilderController }, { type: i0.ElementRef }, { type: i3$1.NgResizeObserver }, { type: i1$1.AzavistaSharedService }]; }, propDecorators: { dataProvider: [{
                type: Input
            }], eventId: [{
                type: Input
            }], debugMode: [{
                type: Input
            }], diagramEl: [{
                type: ViewChild,
                args: ['diagram']
            }], nodeForms: [{
                type: ViewChildren,
                args: [WorkflowBuilderNodeFormComponent]
            }] } });

class AzavistaWorkflowBuilderModule {
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

/*
 * Public API Surface of workflow-builder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AzavistaWorkflowBuilderController, AzavistaWorkflowBuilderModule, DEFAULT_CONNECTOR, DEFAULT_ERROR_STROKE_COLOR, DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH, DEFAULT_SELECTED_STROKE_COLOR, DEFAULT_STROKE_COLOR, DEFAULT_STROKE_WIDTH, ISO_LANGUAGES, OUTPUT_PIN_PAIR, PALETTE_CATEGORIES_INDEX, PALETTE_CATEGORIES_MAP, PALETTE_CATEGORIES_ORDER, PREFIX_CONNECTOR, PREFIX_NODE, PREFIX_PORT, WORKFLOW_EXPLANATION_TRANSLATIONS, WORKFLOW_NAME_TRANSLATIONS, WORKFLOW_TYPE_CATEGORIES, WORKFLOW_TYPE_ORDER, WorkflowBuilderComponent, WorkflowBuilderProviderAbstract, WorkflowBuilderProviderApi, WorkflowBuilderService, ZOOM_FACTOR_OPTIONS, createFormGroupFromData, crmStatusArray, delay, getBuilderWorkflowFromLocalStorage, getConnectorAnnotation, getCrmStatusArray, getDefaultInputPinPort, getDefaultNode, getDefaultOutputPinPort, getFormDirtyValues, getGroupByValue, getMapByValue, getMultipleOutputPorts, getNodeAndConnectorsFromCanvasControllerData, getNodeFromCanvasControllerData, getNodeModelForPalette, getNodeModelForPaletteFromWorkflowType, getNodePortsFromFactory, getOrderedIEventWorkflows, getOutputNonSidePins, getOutputPinFromConnector, getOutputSidePins, getPaletteCategoryMap, getValidConnectorsFromWorkfowFactory, getWorkflowFactory, getWorkflowIdFromNodeId, getWorkflowTypeArray, isObject, mergeDeep, nodeModelForPaletteCreateWorkBlock, objectKeys, omit, reorderWorkflowsByPaletteCategory, saveBuilderWorkflowToLocalStorage, trackBy, trackByAttributeTranslations, trackByWorkflowProperty, workflowTypeArray };
//# sourceMappingURL=azavista-workflow-builder.mjs.map
