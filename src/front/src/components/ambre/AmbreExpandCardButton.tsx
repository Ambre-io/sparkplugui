import React from "react";

import {styled} from '@mui/material/styles';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';


interface AmbreExpandButtonProps extends IconButtonProps {
    expand: boolean;
}

export const AmbreExpandCardButton = styled((props: AmbreExpandButtonProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
