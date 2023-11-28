import React from 'react';

import Grid from "@mui/material/Grid";

import {FormCard} from "./FormCard";
import {LastMessageCard} from "./LastMessageCard";
import {MessagesCard} from "./MessagesCard";
import {SettingCard} from "./SettingCard";
import {SoftCard} from "./SoftCard";
import {styles} from "../../styles/styles";
import {TreeCard} from "./TreeCard";


export const App = ({className}: any) => (
    <main className={className}>
        <Grid container justifyContent='center'>
            <Grid item xs={7}>
                <Grid container>
                    <Grid item xs={3} sx={styles.ambreCardContainer}>
                        <SoftCard/>
                    </Grid>
                    <Grid item xs={6} sx={styles.ambreCardContainer}>
                        <FormCard/>
                    </Grid>
                    <Grid item xs={3} sx={styles.ambreCardContainer}>
                        <SettingCard/>
                    </Grid>
                    <Grid item xs={7} sx={styles.ambreCardContainer}>
                        <TreeCard/>
                    </Grid>
                    <Grid item xs={5} sx={styles.ambreCardContainer}>
                        <LastMessageCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} sx={styles.ambreCardContainer}>
                <MessagesCard/>
            </Grid>
        </Grid>
    </main>
);
