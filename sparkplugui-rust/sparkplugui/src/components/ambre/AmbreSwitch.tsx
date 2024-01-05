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
