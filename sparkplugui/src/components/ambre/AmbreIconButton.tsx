import React from "react";

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
