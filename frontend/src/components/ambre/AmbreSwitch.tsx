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
import {FormControlLabel, FormHelperText} from "@mui/material";

import {AmbreSwitchStyled} from "./AmbreSwitchStyled.tsx";


export const AmbreSwitch = (props: any) => {
    const {label, helper, ...switchProps}: { label: React.ReactNode, helper: string } = props;
    return (
        <div>
            <FormControlLabel
                control={
                    <AmbreSwitchStyled {...switchProps}/>
                }
                label={label}
            />
            <FormHelperText>{helper}</FormHelperText>
        </div>
    )
};
