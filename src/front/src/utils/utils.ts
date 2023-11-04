import {ReadyItemType, treeDataType} from "./types";

export const utils: any = {
    // This should be array.includes('value') but it's to early to use (ES7)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    includes: (value: any, array: Array<any>) => array.indexOf(value) !== -1,
    createTree: (node: treeDataType, equipments: any, inTreeItems: ReadyItemType[]) => {
        const nodeId: string = node.id.toString();
        const currentNode: treeDataType = {
            id: nodeId,
            tag: node.tag,
            parcels: []
        }
        let item: ReadyItemType = {id: nodeId, isParent: false};
        if (node.parcels !== null && node.parcels.length > 0) {
            item.isParent = true;
            node.parcels.map((childId: number) => {
                const equipment = equipments.find((equipment: any) => equipment.id === childId);
                if (equipment !== undefined) currentNode.parcels.push(utils.createTree(equipment, equipments, inTreeItems));
            });
        }
        inTreeItems.push(item);
        return currentNode;
    },
    dateFrom: (timestamp: number): string => new Date(timestamp).toISOString()
}
