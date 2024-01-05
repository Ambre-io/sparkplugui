import React from "react";

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
    nodeTopic: string;
}

// ******************************************
// * MQTT Data
// ******************************************
export interface MQTTDataType {
    host: string;
    port: string;
    username: string;
    password: string;
    topic: string;
}

export interface MessageType {
    topic: string;
    message: string;
    timestamp: number;
}

export type MessagesType = Array<MessageType>;

export type LastMessagesType = Record<string, MessageType>; // string key is topic

// ******************************************
// * Card
// ******************************************

export type CardType = Record<string, boolean>;
export interface AmbreCardType {
    title: string,
    name: string
    children?: any,
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
