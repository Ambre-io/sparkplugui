import React from "react";
import {core} from "../../wailsjs/go/models.ts";

export type stylesType = Record<string, React.DetailedHTMLProps<any, any>>;  // see: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

// ******************************************
// * Tree
// ******************************************
export interface NodeType {
    id: string;
    label: string;
    subnodes: NodeType[];
    options?: NodeOptionsType;
}

export interface NodeOptionsType {
    nodeID: string;
}

// ******************************************
// * MQTT Data
// ******************************************

export type MessagesType = Array<core.MQTTMessage>;

export type LastMessagesType = Record<string, core.MQTTMessage>; // string key is topic

// ******************************************
// * Card
// ******************************************
export interface AmbreCardType {
    title: string,
    stickToBottom?: boolean,
    children?: any,
}

// ******************************************
// * Filenames
// ******************************************
export interface FilenamesType {
    cacrt: string;
    clientcrt: string;
    clientkey: string;
}

// ******************************************
// * Dialog
// ******************************************
export interface AmbreDialogType {
    title: string;
    content: string;
    goAgree: () => void;
    goDisagree?: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ******************************************
// * MUI Overload
// ******************************************
declare module "@mui/x-tree-view/TreeItem" {
    interface TreeItemContentProps extends NodeType {
    }
}

// ******************************************
// * TypeScript Overload
// ******************************************
declare global {
    interface Array<T> {

        last(): T;

        remove(element: T): Array<T>;

        in(element: T, field?: string): boolean;
    }
}
