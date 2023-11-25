import * as React from "react";
import {TreeItemStyled} from "./TreeItemStyled";
import {TreeItemBehavior} from "./TreeItemBehavior";
import {NodeType} from "../../utils/types";


export const TreeItemRender = ({node}: { node: NodeType }) => (
    <TreeItemStyled
        key={'TreeItemStyled' + node.id}
        nodeId={node.id}
        label={node.label}
        ContentComponent={TreeItemBehavior}
        ContentProps={{options: node.options} as any}
    >
        {
            Array.isArray(node.subnodes)
                ? node.subnodes.map((n: any) => <TreeItemRender key={'TreeItemRender' + n.id} node={n}/>)
                : null
        }
    </TreeItemStyled>
);
