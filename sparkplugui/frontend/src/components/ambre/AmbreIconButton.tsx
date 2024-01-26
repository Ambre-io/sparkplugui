/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {AmbreButton} from "./AmbreButton.tsx";
import {AmbreTooltip} from "./AmbreTooltip.tsx";


export const AmbreIconButton = (props: any) => {

    const {icon, onClick, tooltipTitle, ...params} = props;

    if (tooltipTitle === undefined || tooltipTitle === '') {
        return (
            <AmbreButton
                onClick={onClick}
                variant="contained"
                sx={{padding: '6px', minWidth: '20px'}}
                {...params}
            >
                {icon}
            </AmbreButton>
        );
    }

    return (
        <AmbreTooltip title={tooltipTitle}>
            <AmbreButton
                onClick={onClick}
                variant="contained"
                sx={{padding: '6px', minWidth: '20px'}}
                {...params}
            >
                {icon}
            </AmbreButton>
        </AmbreTooltip>
    );
};
