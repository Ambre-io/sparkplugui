/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React, {useEffect, useRef, useState} from 'react';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {Grid} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {TreeView} from "@mui/x-tree-view";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants.ts";
import {getConnected} from "../../redux/events/connectedSlice.ts";
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

    const connected = useSelector(getConnected);
    const messages: MessagesType = useSelector(getMessages);

    const openedNodes = useSelector(getOpenedNodes);

    const treeRef = useRef<NodeType>(utils.createNode(constants.rootID, t('root'), [], {nodeID: ''}));
    const accParentsRef = useRef<string[]>([...initParentNodes]);
    const processedRef = useRef(0);
    const [tree, setTree] = useState<NodeType>(treeRef.current);

    // Reset tree on each new connection (not on disconnect — tree stays visible for inspection)
    useEffect(() => {
        if (!connected) return;
        treeRef.current = utils.createNode(constants.rootID, t('root'), [], {nodeID: ''});
        accParentsRef.current = [...initParentNodes];
        processedRef.current = 0;
        setTree(treeRef.current);
        dispatch(setParentNodes([...initParentNodes]));
    }, [connected]);

    useEffect(() => {
        const newMsgs = messages.slice(processedRef.current);
        if (newMsgs.length === 0) return;

        newMsgs.forEach((msg: core.MQTTMessage) => {
            const {topic} = msg;
            const splitedTopic = topic.split(constants.topicSeparator);
            let lastNode: NodeType = treeRef.current;

            splitedTopic.forEach((subTopic: string, i: number) => {
                const lastNodeTopic = lastNode.options?.nodeID ?? '';
                const nodeID = `${lastNodeTopic}${lastNodeTopic === '' ? '' : constants.topicSeparator}${subTopic}`;
                let node: NodeType = utils.createNode(nodeID, subTopic, [], {nodeID});

                const inTreeNode = lastNode.subnodes.find((n: NodeType) => n.id === nodeID);
                if (inTreeNode !== undefined) {
                    node = inTreeNode;
                } else {
                    if (!lastNode.subnodes.in(node, 'id')) {
                        lastNode.subnodes.push(node);
                    }
                }

                if (splitedTopic.length - 1 === i) { // Leaf
                    dispatch(setLastMessages({[topic]: msg}));
                    if (!node.label.includes(constants.emojiFile)) node.label = `${node.label} ${constants.emojiFile}`;
                } else { // Parent
                    accParentsRef.current.push(node.id);
                }

                lastNode = node;
            });
        });

        processedRef.current = messages.length;
        setTree({...treeRef.current, subnodes: [...treeRef.current.subnodes]});
        dispatch(setParentNodes([...accParentsRef.current]));
    }, [messages]);

    // Node toggle handler rebind to work with the open handler (should be fixed one day)
    const goToggle = (_event: React.SyntheticEvent, nodeIds: string[]) => {
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
