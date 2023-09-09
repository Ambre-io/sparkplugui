import React from 'react';

import {Grid} from "@mui/material";

import {styles} from "../../styles/styles";


export const Forms: React.FC = () => {


    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} sx={styles.commonMarginBottom}>
                <Grid sx={{flexGrow: 1}} container justifyContent='center'>

                </Grid>
            </Grid>
        </Grid>
    );
};
