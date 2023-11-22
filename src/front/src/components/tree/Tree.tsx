import React, {useState} from 'react';

import {Grid} from "@mui/material";
import {TreeView} from "@mui/x-tree-view";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import {NodeType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";
import {constants} from "../../utils/constants";


export const Tree = (props: {data: NodeType}) => {

    const {data} = props;
    const [expanded, setExpanded] = useState<string[]>([constants.rootID]);

    const parents: string[] = []; // TODO calcul for expand button

    // Expand handler
    const goClickTree = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? parents : []
        );
    };

    // Node toggle handler rebind to work with the expand handler (should be fixed one day)
    const goToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={11} sx={styles.tree}>
                <TreeView
                    defaultExpandIcon={<AddBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultEndIcon={<DisabledByDefaultOutlinedIcon sx={{color: '#CECECE'}}/>}
                    expanded={expanded}
                    onNodeToggle={goToggle}
                >
                    <TreeItemRender key="pouet" node={data}/>
                </TreeView>
            </Grid>
        </Grid>
    );
}
