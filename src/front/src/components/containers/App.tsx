import React from 'react';

import {Grid} from "@mui/material";

import {MQTTDataForm} from "./MQTTDataForm";
import {MQTTMessages} from "./MQTTMessages";
import {SoftCard} from "./SoftCard";


export const App: React.FC = () => (
    <main>
        <Grid container sx={{flexGrow: 1}} justifyContent='center'>
            <Grid item sm={12} md={2}>
                <SoftCard/>
            </Grid>
            <Grid item sm={12} md={4}>
                <MQTTDataForm/>
            </Grid>
            <Grid item sm={12} md={6}>
                <MQTTMessages/>
            </Grid>
        </Grid>
    </main>
);
