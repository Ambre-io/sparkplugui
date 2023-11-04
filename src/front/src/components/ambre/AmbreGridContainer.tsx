import React from "react";

import {Grid} from "@mui/material";

import {styles} from "../../styles/styles";

export const AmbreGridContainer = (props: any) => (
    <Grid sx={{flexGrow: 1}} container justifyContent='center'>
        <Grid item xs={11} sx={{flexGrow: 1, marginBottom: 2}}>
            {props.children}
        </Grid>
    </Grid>
);
