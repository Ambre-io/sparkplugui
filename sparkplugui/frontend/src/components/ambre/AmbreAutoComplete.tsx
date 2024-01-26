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
import {Autocomplete} from '@mui/material';

export const AmbreAutoComplete = styled(Autocomplete)(({theme}) => ({
    '& .MuiChip-root': { // MuiButtonBase-root-MuiChip-root
        color: theme.palette.primary.main,
        background: theme.palette.primary.light
    },
}));
