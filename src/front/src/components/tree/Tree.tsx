import React, {useState} from 'react';

import {Grid} from "@mui/material";
import {TreeView} from "@mui/x-tree-view";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {useTranslation} from "react-i18next";

import {MessagesType, MessageType, NodeType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";
import {constants} from "../../utils/constants";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/data/messagesSlice";


const initExpanded: string[] = [constants.rootID];

export const Tree: React.FC = () => {

    const {t} = useTranslation();

    const [expanded, setExpanded] = useState<string[]>([constants.rootID]);

    const messages: MessagesType = useSelector(getMessages);

    // TODO
    //  - parse messages
    //  - create a new sub node on each '/' in the topic
    //  - if node exists go inside
    //  - the metric name is the leaf
    //      - ignition style parse over | but idk if its a good idea
    //      - maybe the good way to do this is to have a single leaf and on click, display last reived decoded metrics

    const nodeRoot: NodeType = {
        id: constants.rootID,
        label: t('tree'),
        subnodes: []
    }

    messages.map((message: MessageType) => {
        message.topic
    });

    const parents: string[] = []; // TODO calcul for expand button

    // Expand handler
    const goClickTree = () => setExpanded((oldExpanded) => (
        oldExpanded.length === initExpanded.length ? parents : initExpanded
    ));

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
                    <TreeItemRender key="pouet" node={nodeRoot}/>
                </TreeView>
            </Grid>
        </Grid>
    );
}
