/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
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
