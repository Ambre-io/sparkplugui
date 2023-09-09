import React from "react";

import {AmbreButton} from "./AmbreButton";


export const AmbreIconButton = (props: any) => {

        const {icon, onClick} = props;

        return (
            <AmbreButton
                onClick={onClick}
                variant="contained"
                sx={{padding: '6px', minWidth: '20px'}}
            >
                {icon}
            </AmbreButton>
        )
}
