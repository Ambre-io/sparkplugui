import React from 'react';

import Grid from "@mui/material/Grid";

import {MQTTDataForm} from "./MQTTDataForm";
import {MQTTMessages} from "./MQTTMessages";
import {SoftCard} from "./SoftCard";
import {TopicTree} from "./TopicTree";
import {styles} from "../../styles/styles";


export const App: React.FC = () => (
    <main>
        <Grid container justifyContent='center'>
            <Grid item xs={7}>
                <Grid container>
                    <Grid item xs={3} sx={styles.ambreCardContainer}>
                        <SoftCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.ambreCardContainer}>
                        <MQTTDataForm/>
                    </Grid>
                    <Grid item xs={12} sx={styles.ambreCardContainer}>
                        <TopicTree/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} sx={styles.ambreCardContainer}>
                <MQTTMessages/>
            </Grid>
        </Grid>
    </main>
);
