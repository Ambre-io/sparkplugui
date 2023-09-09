import React from "react";

import {Grid} from "@mui/material";

import {styles} from "../../styles/styles";

export const AmbreGridContainer = (props: any) => (
    <Grid sx={{flexGrow: 1}} container justifyContent='center'>
        <Grid item xs={11} sx={styles.flexMarginBottom}>
            {props.children}
        </Grid>
    </Grid>
);
