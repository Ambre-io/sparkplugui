import React from 'react';

import {Grid} from "@mui/material";

import {MQTTDataForm} from "../forms/MQTTDataForm";
import {styles} from "../../styles/styles";


export const Form: React.FC = () => {

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} md={10} sx={styles.commonMarginBottom}>
                <Grid sx={{flexGrow: 1}} container>
                    <Grid item sx={styles.boxShadowForms}>
                        <MQTTDataForm/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
