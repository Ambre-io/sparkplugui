import * as React from 'react';

import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import {useTreeItem, TreeItemContentProps} from '@mui/x-tree-view';

import {setSelectedTopic} from "../../redux/data/selectedTopicSlice.ts";
import {useDispatch} from "react-redux";


export const TreeItemBehavior = React.forwardRef((props: TreeItemContentProps, ref: any) => {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        options
    } = props;

    const {
        disabled,
        expanded,
        selected,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const dispatch = useDispatch();

    const icon = iconProp || expansionIcon || displayIcon;

    const goMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        preventSelection(event);
    };

    const goExpansion = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleExpansion(event);
    };

    const goSelection = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleSelection(event);
        if (options !== undefined) dispatch(setSelectedTopic(options.nodeID));
    };

    return (
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.disabled]: disabled,
            })}
            onMouseDown={goMouseDown}
            ref={ref as React.Ref<HTMLDivElement>}
        >
            <div onClick={goExpansion} className={classes.iconContainer}>
                {icon}
            </div>
            <Typography onClick={goSelection} component="div" className={classes.label}>
                {label}
            </Typography>
        </div>
    );
});
