import React, {useEffect, useState} from 'react';

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {Grid} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {TreeView} from "@mui/x-tree-view";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {MessageType, NodeType, TreeType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";
import {utils} from '../../utils/utils';
import {setLastMessages} from "../../redux/data/lastMessagesSlice";


const initExpanded: string[] = [constants.rootID];

export const Tree = (props: TreeType) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {messages} = props;

    const [expanded, setExpanded] = useState<string[]>([constants.rootID]);

    let nodeRoot: NodeType = utils.createNode(constants.rootID, t('root'), [], {nodeTopic: ''});
    const [tree, setTree] = useState<NodeType>(nodeRoot);

    useEffect(() => {
        messages.map((msg: MessageType) => {
            const {topic, message} = msg;

            const splitedTopic = topic.split(constants.topicSeparator);

            let lastNode: NodeType = nodeRoot;
            splitedTopic.map((str: string, i: number) => {

                // create node with the node topic
                const lastNodeTopic = lastNode.options?.nodeTopic ?? '';
                const nodeTopic = `${lastNodeTopic}${lastNodeTopic === '' ? '' : '/'}${str}`;
                let node: NodeType = utils.createNode(nodeTopic, str, [], {nodeTopic});

                // get or create node
                const inTreeNode = lastNode.subnodes.find((n: NodeType) => n.label === str);
                if (inTreeNode !== undefined) {
                    node = inTreeNode;
                } else {
                    if (!lastNode.subnodes.in(node, 'id')) lastNode.subnodes.push(node);
                }

                // Leaf: last part of the topic
                if (splitedTopic.length - 1 === i) {
                    dispatch(setLastMessages({[topic]: message}));
                    node.label = `${node.label} 📄`;
                }

                // update the parent node
                lastNode = node;
            });
        });
        setTree(nodeRoot);
    }, [messages]);

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
                <TreeView
                    defaultExpandIcon={<AddBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultEndIcon={<DisabledByDefaultOutlinedIcon sx={{color: '#CECECE'}}/>}
                    expanded={expanded}
                    onNodeToggle={goToggle}
                >
                    <TreeItemRender key="pouet" node={tree}/>
                </TreeView>
            </Grid>
        </Grid>
    );
};
