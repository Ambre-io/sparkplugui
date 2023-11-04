import React from 'react';

import Grid from "@mui/material/Unstable_Grid2";

import {MQTTDataForm} from "./MQTTDataForm";
import {MQTTMessages} from "./MQTTMessages";
import {SoftCard} from "./SoftCard";
import {TopicTree} from "./TopicTree";


export const App: React.FC = () => (
    <main>
        <Grid container sx={{flexGrow: 1}} justifyContent='center'>
            <Grid xs={6}>
                <Grid container sx={{flexGrow: 1}} >
                    <Grid xs={4} md={2}>
                        <SoftCard/>
                    </Grid>
                    <Grid xs={3} md={3}>
                        <MQTTDataForm/>
                    </Grid>
                    <Grid xs={12}>
                        <TopicTree/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={6}>
                <Grid container>
                    <Grid sm={12} md={6}>
                        <MQTTMessages/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </main>
);
