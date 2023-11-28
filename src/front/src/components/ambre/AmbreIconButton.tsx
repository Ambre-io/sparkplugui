import React from "react";

import {AmbreButton} from "./AmbreButton";


export const AmbreIconButton = (props: any) => (
    <AmbreButton onClick={props.onClick} variant="contained" sx={{padding: '6px', minWidth: '20px'}}>
        {props.icon}
    </AmbreButton>
);
