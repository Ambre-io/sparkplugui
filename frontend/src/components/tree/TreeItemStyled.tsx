/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import {TreeItem, treeItemClasses, TreeItemProps} from '@mui/x-tree-view';
import {TreeItemTransition} from "./TreeItemTransition.tsx";


export const TreeItemStyled = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TreeItemTransition}/>
))(({theme}) => ({
    '& .MuiTreeItem-content:hover': {
        background: 'transparent',
        [`& .${treeItemClasses.label}`]: {
            border: `1px solid ${theme.palette.primary.dark}`,
            background: theme.palette.primary.main
        }
    },
    [`& .${treeItemClasses.selected}`]: {
        background: 'transparent',
        color: theme.palette.primary.dark,
        [`& .${treeItemClasses.label}`]: {
            background: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.dark}`
        }
    },
    [`& .${treeItemClasses.root}`]: {
        '& .MuiTreeItem-content:hover': {
            background: 'transparent',
            [`& .${treeItemClasses.label}`]: {
                border: `1px solid ${theme.palette.primary.dark}`,
                background: theme.palette.primary.main
            }
        },
        [`& .${treeItemClasses.selected}`]: {
            background: 'transparent',
            color: theme.palette.primary.dark,
            [`& .${treeItemClasses.label}`]: {
                background: theme.palette.primary.light,
                border: `1px solid ${theme.palette.primary.dark}`,
            }
        },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        paddingLeft: 10,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        marginLeft: 10,
    },
    [`& .${treeItemClasses.label}`]: {
        margin: 2,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
    },
}));
