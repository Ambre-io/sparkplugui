import React from 'react';

import Grid from "@mui/material/Grid";

import {LastMessage} from "./LastMessage";
import {MQTTDataForm} from "./MQTTDataForm";
import {MQTTMessages} from "./MQTTMessages";
import {SoftCard} from "./SoftCard";
import {TopicTree} from "./TopicTree";
import {styles} from "../../styles/styles";


export const App = ({className}: any) => (
    <main className={className}>
        <Grid container justifyContent='center'>
            <Grid item xs={7}>
                <Grid container>
                    <Grid item xs={3} sx={styles.ambreCardContainer}>
                        <SoftCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.ambreCardContainer}>
                        <MQTTDataForm/>
                    </Grid>
                    <Grid item xs={7} sx={styles.ambreCardContainer}>
                        <TopicTree/>
                    </Grid>
                    <Grid item xs={5} sx={styles.ambreCardContainer}>
                        <LastMessage/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} sx={styles.ambreCardContainer}>
                <MQTTMessages/>
            </Grid>
        </Grid>
    </main>
);
