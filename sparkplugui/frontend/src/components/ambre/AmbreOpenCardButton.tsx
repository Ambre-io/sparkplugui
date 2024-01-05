import React from "react";

import {styled} from '@mui/material/styles';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';

interface AmbreOpenButtonProps extends IconButtonProps {
    open: boolean;
}

export const AmbreOpenCardButton = styled((props: AmbreOpenButtonProps) => {
    const {open, ...other} = props;
    return <IconButton {...other} />;
})(({theme, open}) => ({
    transform: !open ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
