import React, {useEffect, useState} from 'react';

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {Grid} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {TreeView} from "@mui/x-tree-view";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {getExpandedNodes, setExpandedNodes} from "../../redux/data/expandedNodesSlice";
import {getMessages} from "../../redux/data/messagesSlice";
import {initParentNodes, setParentNodes} from "../../redux/data/parentNodesSlice";
import {MessagesType, MessageType, NodeType} from "../../utils/types";
import {setLastMessages} from "../../redux/data/lastMessagesSlice";
import {styles} from "../../styles/styles";
import {TreeItemRender} from "./TreeItemRender";
import {utils} from '../../utils/utils';


export const Tree: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const messages: MessagesType = useSelector(getMessages);

    const expandedNodes = useSelector(getExpandedNodes);

    let nodeRoot: NodeType = utils.createNode(constants.rootID, t('root'), [], {nodeTopic: ''});
    const [tree, setTree] = useState<NodeType>(nodeRoot);

    useEffect(() => {
        // Create tree
        // FIXME known bug: When first messages arrive, the root tree appear but the first node is hide
        //  if you click the expand button the first node appear...
        const parents: string[] = [...initParentNodes];
        messages.map((msg: MessageType) => {
            const {topic, message} = msg;

            const splitedTopic = topic.split(constants.topicSeparator);
            let lastNode: NodeType = nodeRoot;
            splitedTopic.map((subTopic: string, i: number) => {

                // create node with the node topic
                const lastNodeTopic = lastNode.options?.nodeTopic ?? '';
                const nodeTopic = `${lastNodeTopic}${lastNodeTopic === '' ? '' : '/'}${subTopic}`;
                let node: NodeType = utils.createNode(nodeTopic, subTopic, [], {nodeTopic});

                // get or create node
                const inTreeNode = lastNode.subnodes.find((n: NodeType) => n.id === nodeTopic);
                if (inTreeNode !== undefined) {
                    node = inTreeNode;
                } else {
                    if (!lastNode.subnodes.in(node, 'id')) lastNode.subnodes.push(node);
                }

                // Leaf: last part of the topic
                if (splitedTopic.length - 1 === i) {
                    dispatch(setLastMessages({[topic]: message}));
                    if (!node.label.includes(constants.emojiFile)) node.label = `${node.label} ${constants.emojiFile}`;
                } else {
                    parents.push(node.id);
                }

                // update the parent node
                lastNode = node;
            });
        });

        // Update the tree state
        setTree(nodeRoot);

        // Update parents for expand/collapse button
        dispatch(setParentNodes(parents));

    }, [messages]);

    // Node toggle handler rebind to work with the expand handler (should be fixed one day)
    const goToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        dispatch(setExpandedNodes(nodeIds));
    };

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} sx={styles.tree}>
                <TreeView
                    defaultExpandIcon={<AddBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon sx={{color: '#000000'}}/>}
                    defaultEndIcon={<DisabledByDefaultOutlinedIcon sx={{color: '#CECECE'}}/>}
                    expanded={expandedNodes}
                    onNodeToggle={goToggle}
                >
                    {(tree.subnodes.length > 0) && (<TreeItemRender key="pouet" node={tree}/>)}
                </TreeView>
            </Grid>
        </Grid>
    );
};