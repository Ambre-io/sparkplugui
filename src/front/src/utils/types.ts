import {DetailedHTMLProps} from "react";

export type stylesType = Record<string, DetailedHTMLProps<any, any>>;  // see: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

// ******************************************
// * Tree
// ******************************************
export interface treeDataType {
    id: string;
    tag: string;
    parcels: Array<any>;
}

export interface ReadyItemType {
    id: string;
    isParent: boolean;
}

export interface TreeButtonType {
    expanded: string[];
    goClick: () => void;
}

// ******************************************
// * MQTT Data
// ******************************************

export interface MQTTDataType {
    // TODO
}