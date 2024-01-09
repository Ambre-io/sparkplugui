import * as React from 'react';

import {Grid} from "@mui/material";

import {ConnectButton} from "../eventbuttons/ConnectButton.tsx";
import {FoldCardsButton} from "../eventbuttons/FoldCardsButton.tsx";
import {OpenNodesButton} from "../eventbuttons/OpenNodesButton.tsx";
import {LanguageSelection} from "../eventbuttons/LanguageSelection.tsx";
import {primaryDark} from "../../styles/muiTheme.ts";
import SETTINGS from '../../../../../settings.json';
import {styles} from "../../styles/styles.ts";


export const SoftCard: React.FC = () => (
    <Grid container sx={styles.ambreCard}>
        <Grid item sx={styles.softContainer}>
            <img style={styles.softLogo} alt='SparkplugUI logo' src='src/assets/images/logo.svg'/>
            <div style={styles.softTitle}>SparkplugUI</div>
            <div style={styles.softSubTitle}>
                {SETTINGS.version} by <span style={styles.color(primaryDark)}>{SETTINGS.creator.name}</span>
            </div>
        </Grid>
        <Grid item>
            <Grid container alignItems='center'>
                <Grid item sx={styles.padding(1)}>
                    <LanguageSelection/>
                </Grid>
                <Grid item sx={styles.padding(1)}>
                    <ConnectButton/>
                </Grid>
                <Grid item sx={styles.padding(1)}>
                    <FoldCardsButton/>
                </Grid>
                <Grid item sx={styles.padding(1)}>
                    <OpenNodesButton/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);
