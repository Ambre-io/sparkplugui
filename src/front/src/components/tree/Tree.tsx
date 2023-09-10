import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {TreeView} from "@mui/lab";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {useTranslation} from "react-i18next";

import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";


export const Tree = (props: any) => {

    const {treeData} = props;
    const {t} = useTranslation();
    const [expanded, setExpanded] = useState<string[]>([]);

    const parents: string[] = []; // TODO calcul for expand button

    const goClickTree = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? parents : []
        );
    };

    // After instanciate the Expand/Collapse button with expanded state
    // it didn't work anymore, until I rebind onNodeToggle={goToggle}
    const goToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} sx={styles.tree}>
                <span style={styles.subtitle}>{t('tree')}</span>
                <TreeView
                    defaultExpandIcon={<AddBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultEndIcon={<DisabledByDefaultOutlinedIcon sx={{color: '#CECECE'}}/>}
                    expanded={expanded}
                    onNodeToggle={goToggle}
                >
                    <TreeItemRender key="pouet" node={treeData}/>
                </TreeView>
            </Grid>
        </Grid>
    );
}
