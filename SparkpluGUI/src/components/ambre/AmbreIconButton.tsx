import React from "react";

import {AmbreButton} from "./AmbreButton";
import {AmbreTooltip} from "./AmbreTooltip";


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
