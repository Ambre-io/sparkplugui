import React, {useEffect, useState} from 'react';

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {Grid} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {TreeView} from "@mui/x-tree-view";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {MessagesType, MessageType, NodeType} from "../../utils/types";
import {getMessages} from "../../redux/data/messagesSlice";
import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";
import {utils} from '../../utils/utils';


const initExpanded: string[] = [constants.rootID];

export const Tree: React.FC = () => {

    const {t} = useTranslation();

    const [expanded, setExpanded] = useState<string[]>([constants.rootID]);

    const messages: MessagesType = useSelector(getMessages);

    let nodeRoot: NodeType = utils.createNode(constants.rootID, t('root'));

    messages.map((msg: MessageType) => {
        const {topic, message} = msg;

        const splitedTopic = topic.split(constants.topicSeparator);
        if (splitedTopic.length < 1) return;

        // TODO
        //  - create a lastMessages slice
        //  - save and update last message
        //  - select the displayed last message

        let lastNode: NodeType = utils.createNode(splitedTopic[0], splitedTopic[0]);
        splitedTopic.map((str: string, i: number) => {
            const node: NodeType = utils.createNode(str, str);
            if (i === 0 && !nodeRoot.subnodes.in(node, 'id')) {
                nodeRoot.subnodes.push(node);
                // TODO update last message
                if (splitedTopic.length - 1 === i) {
                    node.label = `${node.label}: ${utils.shortWord(message, 30)}`;
                }
            } else if (!lastNode.subnodes.in(node, 'id')) {
                lastNode.subnodes.push(node);
                // TODO update last message
                if (splitedTopic.length - 1 === i) {
                    node.label = `${node.label}: ${utils.shortWord(message, 30)}`;
                }
            }
            lastNode = node;
        });
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
            <Grid item xs={12} sx={styles.tree}>
                <span style={styles.subtitle}>{t('tree')}</span>
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
