import * as React from 'react';

import {alpha, styled} from '@mui/material/styles';
import {TreeItem, treeItemClasses, TreeItemProps} from '@mui/x-tree-view';
import {TreeItemTransition} from "./TreeItemTransition";


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
    },
    [`& .${treeItemClasses.label}`]: {
        margin: 2,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
    },
}));
