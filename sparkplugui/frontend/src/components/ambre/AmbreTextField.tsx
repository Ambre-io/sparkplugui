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
import {TextField} from "@mui/material";


export const AmbreTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        color: theme.palette.primary.dark,
        '& fieldset': {
            borderColor: theme.palette.primary.main
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.light
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },
}));
