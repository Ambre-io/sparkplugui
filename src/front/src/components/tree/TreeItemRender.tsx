import * as React from "react";
import {TreeItemStyled} from "./TreeItemStyled";
import {TreeItemBehavior} from "./TreeItemBehavior";


export const TreeItemRender = ({node}: { node: any }) => (
    <TreeItemStyled
        key={'TreeItemStyled' + node.id}
        nodeId={node.id}
        label={node.tag}
        ContentComponent={TreeItemBehavior}
    >
        {
            Array.isArray(node.parcels)
                ? node.parcels.map((n: any) => <TreeItemRender key={'TreeItemRender' + n.id} node={n}/>)
                : null
        }
    </TreeItemStyled>
);
