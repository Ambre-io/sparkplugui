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
import {useDispatch, useSelector, useStore} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants.ts";
import {getTreeReset} from "../../redux/events/treeResetSlice.ts";
import {getOpenedNodes, setOpenedNodes} from "../../redux/data/openedNodesSlice.ts";
import {getMessages} from "../../redux/data/messagesSlice.ts";
import {initParentNodes, setParentNodes} from "../../redux/data/parentNodesSlice.ts";
import {NodeType} from "../../utils/types.ts";
import {setLastMessages} from "../../redux/data/lastMessagesSlice.ts";
import {styles} from "../../styles/styles.ts";
import {TreeItemRender} from "./TreeItemRender.tsx";
import {utils} from '../../utils/utils.ts';

import {core} from "../../../wailsjs/go/models.ts";


export const Tree: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const store = useStore();

    const treeReset = useSelector(getTreeReset);
    const openedNodes = useSelector(getOpenedNodes);

    const treeRef = useRef<NodeType>(utils.createNode(constants.rootID, t('root'), [], {nodeID: ''}));
    // Flat map nodeID → node for O(1) lookup instead of O(n) find() per segment
    const nodeMapRef = useRef<Map<string, NodeType>>(new Map([[constants.rootID, treeRef.current]]));
    // Set of known leaf topics: skips tree-walking entirely for already-seen topics
    const knownLeafsRef = useRef<Set<string>>(new Set());
    // Set instead of array: no duplicates, no unbounded growth
    const accParentsRef = useRef<Set<string>>(new Set(initParentNodes));
    const processedRef = useRef(0);
    const [tree, setTree] = useState<NodeType>(treeRef.current);

    // Reset tree when topic/host changes
    useEffect(() => {
        if (treeReset === 0) return;
        treeRef.current = utils.createNode(constants.rootID, t('root'), [], {nodeID: ''});
        nodeMapRef.current = new Map([[constants.rootID, treeRef.current]]);
        knownLeafsRef.current = new Set();
        accParentsRef.current = new Set(initParentNodes);
        processedRef.current = 0;
        setTree(treeRef.current);
        dispatch(setParentNodes([...initParentNodes]));
    }, [treeReset]);

    // Subscribe directly to the Redux store instead of useSelector(getMessages).
    // This decouples Tree rendering from message frequency: the component only
    // re-renders (via setTree) when new topics are discovered, not on every message.
    useEffect(() => {
        return store.subscribe(() => {
            const messages = getMessages((store as any).getState());
            const newMsgs = messages.slice(processedRef.current);
            if (newMsgs.length === 0) return;
            processedRef.current = messages.length;

            let treeChanged = false;
            const newLastMessages: Record<string, core.MQTTMessage> = {};

            newMsgs.forEach((msg: core.MQTTMessage) => {
                const {topic} = msg;
                newLastMessages[topic] = msg;

                if (knownLeafsRef.current.has(topic)) return; // known topic — skip tree walk
                knownLeafsRef.current.add(topic);
                treeChanged = true;

                const parts = topic.split(constants.topicSeparator);
                let lastNode = treeRef.current;
                let nodeID = '';

                parts.forEach((subTopic: string, i: number) => {
                    nodeID = nodeID === '' ? subTopic : `${nodeID}${constants.topicSeparator}${subTopic}`;

                    const existing = nodeMapRef.current.get(nodeID);
                    const node: NodeType = existing ?? utils.createNode(nodeID, subTopic, [], {nodeID});
                    if (!existing) {
                        lastNode.subnodes.push(node);
                        nodeMapRef.current.set(nodeID, node);
                    }

                    if (i === parts.length - 1) { // leaf
                        if (!node.label.includes(constants.emojiFile)) {
                            node.label = `${node.label} ${constants.emojiFile}`;
                        }
                    } else { // parent
                        accParentsRef.current.add(nodeID);
                    }

                    lastNode = node;
                });
            });

            dispatch(setLastMessages(newLastMessages));

            if (treeChanged) {
                setTree({...treeRef.current, subnodes: [...treeRef.current.subnodes]});
                dispatch(setParentNodes([...accParentsRef.current]));
            }
        });
    }, []);

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
                    {(tree.subnodes.length > 0) && (<TreeItemRender key="root" node={tree}/>)}
                </TreeView>
            </Grid>
        </Grid>
    );
};
