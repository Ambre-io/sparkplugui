import * as React from 'react';
import {styled} from '@mui/material/styles';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';


export const AmbreTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}} children={props.children}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: '0px 0px 3px 0px #B7B7B7',
        fontSize: 13,
    }
}));
