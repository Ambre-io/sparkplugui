import {DetailedHTMLProps} from "react";

export type stylesType = Record<string, DetailedHTMLProps<any, any>>;  // see: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

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

export interface ReadyNodeType {
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

// ******************************************
// * MUI Overload
// ******************************************
declare module "@mui/x-tree-view/TreeItem" {
    interface TreeItemContentProps extends NodeType {}
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
