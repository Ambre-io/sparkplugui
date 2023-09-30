import React from 'react';

import {Grid} from "@mui/material";

import {Form} from "./Form";
import {SoftCard} from "./SoftCard";
import {MQTTMessages} from "./MQTTMessages";


export const App: React.FC = () => (
    <main>
        <Grid container sx={{flexGrow: 1}}>
            <Grid item xs={12}>
                <SoftCard/>
            </Grid>
            <Grid container sx={{flexGrow: 1}}>
                <Grid item sm={12} md={6}>
                    <Form/>
                </Grid>
                <Grid item sm={12} md={6}>
                    <MQTTMessages/>
                </Grid>
            </Grid>
        </Grid>
    </main>
);
