// ******************************************
// * Utils
// ******************************************

import {NodeOptionsType, NodeType} from "./types.ts";

export const utils: any = {
    includes: (value: any, array: Array<any>) => array.indexOf(value) !== -1,
    createNode: (id: string, label: string, subnodes: NodeType[] = [], options?: NodeOptionsType): NodeType => ({id, label, subnodes, options}),
    shortWord: (word: string, len: number): string => `${word.slice(0, len)}${word.length > len ? '...' : ''}`,
    mulberry32: (a: number) =>  {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    },
    simpleGen: (): string => Math.random().toString(36).substring(2, 9)
}
