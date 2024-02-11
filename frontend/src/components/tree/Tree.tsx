/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React, {useEffect, useState} from 'react';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {Grid} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {TreeView} from "@mui/x-tree-view";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants.ts";
import {getOpenedNodes, setOpenedNodes} from "../../redux/data/openedNodesSlice.ts";
import {getMessages} from "../../redux/data/messagesSlice.ts";
import {initParentNodes, setParentNodes} from "../../redux/data/parentNodesSlice.ts";
import {MessagesType, NodeType} from "../../utils/types.ts";
import {setLastMessages} from "../../redux/data/lastMessagesSlice.ts";
import {styles} from "../../styles/styles.ts";
import {TreeItemRender} from "./TreeItemRender.tsx";
import {utils} from '../../utils/utils.ts';

import {core} from "../../../wailsjs/go/models.ts";


export const Tree: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const messages: MessagesType = useSelector(getMessages);

    const openedNodes = useSelector(getOpenedNodes);

    let nodeRoot: NodeType = utils.createNode(constants.rootID, t('root'), [], {nodeID: ''});
    const [tree, setTree] = useState<NodeType>(nodeRoot);

    useEffect(() => {
        // Create tree
        const parents: string[] = [...initParentNodes];

        // Loop over messages
        messages.map((msg: core.MQTTMessage) => {

            // Split the topic: WAW/SUPER/TOPIC => [WAW, SUPER, TOPIC]
            const {topic} = msg;
            const splitedTopic = topic.split(constants.topicSeparator);
            let lastNode: NodeType = nodeRoot;

            // Loop over the topic parts
            splitedTopic.map((subTopic: string, i: number) => {

                // Create a tree node using the topic
                const lastNodeTopic = lastNode.options?.nodeID ?? '';
                const nodeID = `${lastNodeTopic}${lastNodeTopic === '' ? '' : constants.topicSeparator}${subTopic}`;
                let node: NodeType = utils.createNode(nodeID, subTopic, [], {nodeID});

                // Update current node reference if exists or add it to the tree
                const inTreeNode = lastNode.subnodes.find((n: NodeType) => n.id === nodeID);
                if (inTreeNode !== undefined) {
                    node = inTreeNode;
                } else {
                    if (!lastNode.subnodes.in(node, 'id')) {
                        lastNode.subnodes.push(node); // Push it
                    }
                }

                // Leaf or Parent
                if (splitedTopic.length - 1 === i) { // Leaf
                    // Update the last message
                    dispatch(setLastMessages({[topic]: msg}));
                    // Add the file emoji
                    if (!node.label.includes(constants.emojiFile)) node.label = `${node.label} ${constants.emojiFile}`;

                } else { // Parent
                    parents.push(node.id);
                }

                // update last node reference
                lastNode = node;
            });
        });

        // Update the tree state
        setTree(nodeRoot);

        // Update parents for open/close button
        dispatch(setParentNodes(parents));

    }, [messages]);

    // Node toggle handler rebind to work with the open handler (should be fixed one day)
    const goToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        dispatch(setOpenedNodes(nodeIds));
    };

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} sx={styles.tree}>
                <TreeView
                    defaultExpandIcon={<AddBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultEndIcon={<DisabledByDefaultOutlinedIcon sx={{color: '#CECECE'}}/>}
                    expanded={openedNodes}
                    onNodeToggle={goToggle}
                >
                    {(tree.subnodes.length > 0) && (<TreeItemRender key="pouet" node={tree}/>)}
                </TreeView>
            </Grid>
        </Grid>
    );
};
