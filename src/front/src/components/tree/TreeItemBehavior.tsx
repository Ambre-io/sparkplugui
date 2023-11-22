import * as React from 'react';

import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import {useTreeItem, TreeItemContentProps} from '@mui/x-tree-view';
import {constants} from '../../utils/constants';
import {styles} from "../../styles/styles";


export const TreeItemBehavior = React.forwardRef((props: TreeItemContentProps, ref: any) => {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
    } = props;

    const {
        disabled,
        expanded,
        selected,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const goMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        preventSelection(event);
    };

    const goExpansion = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleExpansion(event);
    };

    const goSelection = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleSelection(event);
        // TODO DO SOMETHING
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
            style={nodeId === constants.rootID ? styles.TitilliumWebBold : {}}
        >
            <div onClick={goExpansion} className={classes.iconContainer}>
                {icon}
            </div>
            <Typography
                onClick={goSelection}
                component="div"
                className={classes.label}
                sx={nodeId === constants.rootID ? styles.TitilliumWebBold : {}}
            >
                {label}
            </Typography>
        </div>
    );
});
