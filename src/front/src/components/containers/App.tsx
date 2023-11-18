import React from 'react';

import Grid from "@mui/material/Unstable_Grid2";

import {MQTTDataForm} from "./MQTTDataForm";
import {MQTTMessages} from "./MQTTMessages";
import {SoftCard} from "./SoftCard";
import {TopicTree} from "./TopicTree";
import {styles} from "../../styles/styles";


export const App: React.FC = () => (
    <main style={styles.height100}>
        <Grid container sx={{...styles.height100, flexGrow: 1}} justifyContent='center'>
            <Grid xs={6}>
                <Grid container sx={{flexGrow: 1}}>
                    <Grid xs={4} md={2} sx={styles.ambreCardContainer}>
                        <SoftCard/>
                    </Grid>
                    <Grid xs={3} md={3} sx={styles.ambreCardContainer}>
                        <MQTTDataForm/>
                    </Grid>
                    <Grid xs={12} sx={styles.ambreCardContainer}>
                        <TopicTree/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={6} sx={styles.height100}>
                <Grid container sx={styles.height100}>
                    <Grid sm={12} md={6} sx={{...styles.ambreCardContainer, ...styles.height100}}>
                        <MQTTMessages/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </main>
);
