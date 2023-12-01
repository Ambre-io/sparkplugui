import React from 'react';

import Grid from "@mui/material/Grid";

import {FormCard} from "./FormCard";
import {LastMessageCard} from "./LastMessageCard";
import {MessagesCard} from "./MessagesCard";
import {SoftCard} from "./SoftCard";
import {styles} from "../../styles/styles";
import {TreeCard} from "./TreeCard";


export const App = ({className}: any) => (
    <main className={className}>
        <Grid container>
            <Grid item xs={7}>
                <Grid container>
                    <Grid item xs={6} sx={styles.padding(2)}>
                        <SoftCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.padding(2)}>
                        <FormCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.padding(2)}>
                        <TreeCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.padding(2)}>
                        <LastMessageCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} sx={styles.padding(2)}>
                <MessagesCard/>
            </Grid>
        </Grid>
    </main>
);
