import {UPayload} from "sparkplug-payload/lib/sparkplugbpayload";


export const utils = {
    sparkplugPayload: (): UPayload => ({timestamp: new Date().getTime(), metrics: []}),
    includes: (value: any, array: Array<any>): boolean => array.indexOf(value) !== -1,
    findID: (array: Array<any>, id: number): any => array.find((element: any) => element.id === id)
};
