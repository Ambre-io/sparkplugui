import * as React from 'react';

import {alpha, styled} from '@mui/material/styles';
import TreeItem, {TreeItemProps, treeItemClasses} from '@mui/lab/TreeItem';
import {TreeItemTransition} from "./TreeItemTransition";


export const TreeItemStyled = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TreeItemTransition}/>
))(({theme}) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.root}`]: {
        '& .MuiTreeItem-content:hover': {
            background: theme.palette.primary.light,
        },
        [`& .${treeItemClasses.selected}`]: {
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
        }
    }
}));
