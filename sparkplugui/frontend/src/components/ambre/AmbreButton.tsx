/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {styled} from '@mui/system';
import {Button} from '@mui/material';

export const AmbreButton = styled(Button)(({theme}) => ({
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
    fontWeight: 800,
    '&:hover': {
        background: theme.palette.primary.dark,
    }
}));
