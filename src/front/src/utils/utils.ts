import {ReadyNodeType, NodeType} from "./types";

export const utils: any = {
    // This should be array.includes('value') but it's to early to use (ES7)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    includes: (value: any, array: Array<any>) => array.indexOf(value) !== -1,
    createTree: (node: NodeType, nodes: NodeType[], readyNodes: ReadyNodeType[]) => {
        const newNode: NodeType = {
            id: node.id,
            label: node.label,
            subnodes: []
        }
        let item: ReadyNodeType = {id: node.id, isParent: false};
        if (node.subnodes !== null && node.subnodes.length > 0) {
            item.isParent = true;
            node.subnodes.map((subNode: NodeType) => {
                const eq = nodes.find((node: NodeType) => node.id === subNode.id);
                if (eq !== undefined) newNode.subnodes.push(utils.createTree(eq, nodes, readyNodes));
            });
        }
        readyNodes.push(item);
        return newNode;
    },
    dateFrom: (timestamp: number): string => new Date(timestamp).toISOString()
}
