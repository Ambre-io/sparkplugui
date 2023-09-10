import React from 'react';

import {Grid} from "@mui/material";

import {MQTTDataForm} from "../forms/MQTTDataForm";
import {styles} from "../../styles/styles";


export const Forms: React.FC = () => {

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} sx={styles.commonMarginBottom}>
                <Grid sx={{flexGrow: 1}} container>
                    <Grid item md={12} lg={8} sx={styles.boxShadowForms}>
                        <MQTTDataForm/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
