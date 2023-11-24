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

const createNode = (id: string, label: string, subnodes: NodeType[] = []): NodeType => ({id, label, subnodes});

export const Tree: React.FC = () => {

    const {t} = useTranslation();

    const [expanded, setExpanded] = useState<string[]>([constants.rootID]);

    const messages: MessagesType = useSelector(getMessages);

    const nodeRoot: NodeType = createNode(constants.rootID, t('root'));

    messages.map((msg: MessageType) => {
        const {topic, message} = msg;

        const splitedTopic = topic.split(constants.topicSeparator);
        if (splitedTopic.length < 1) return;

        let lastNode: NodeType = createNode(splitedTopic[0], splitedTopic[0]);
        splitedTopic.map((str: string, i: number) => {
            const node = createNode(str, str);
            if (i === 0 && !nodeRoot.subnodes.in(node)) {
                nodeRoot.subnodes.push(node);
                if(splitedTopic.length - 1 === i) node.subnodes.push(createNode(`${str}-${i}`, message));
            } else if (!lastNode.subnodes.in(node)) {
                lastNode.subnodes.push(node);
                if(splitedTopic.length - 1 === i) node.subnodes.push(createNode(`${str}-${i}`, message));
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
            <Grid item xs={11} sx={styles.tree}>
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
