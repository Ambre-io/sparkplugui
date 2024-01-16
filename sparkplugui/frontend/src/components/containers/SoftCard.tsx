import * as React from 'react';

import {Grid} from "@mui/material";

import {ConnectButton} from "../eventbuttons/ConnectButton.tsx";
import {CustomizableButton} from "../eventbuttons/CustomizableButton.tsx";
import {OpenNodesButton} from "../eventbuttons/OpenNodesButton.tsx";
import {LanguageSelection} from "../eventbuttons/LanguageSelection.tsx";
import {primaryDark} from "../../styles/muiTheme.ts";
import SETTINGS from '../../../../../settings.json';
import {styles} from "../../styles/styles.ts";


export const SoftCard: React.FC = () => (
    <Grid container sx={{height: '100%'}} justifyContent='center'>
        <Grid item md={12} lg={11} sx={{p: 1}}>
            <Grid container sx={styles.softContainer}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <img style={styles.softLogo} alt='' src='src/assets/images/logo.svg'/>
                    <div style={styles.softTitle}>SparkpluGUI</div>
                    <div style={styles.softSubTitle}>
                        {SETTINGS.version} by <span style={styles.color(primaryDark)}>{SETTINGS.creator.name}</span>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems='center' justifyContent="center" sx={styles.softActions} wrap="nowrap">
                        <Grid item sx={styles.padding(1)}>
                            <LanguageSelection/>
                        </Grid>
                        <Grid item sx={styles.padding(1)}>
                            <ConnectButton/>
                        </Grid>
                        <Grid item sx={styles.padding(1)}>
                            <OpenNodesButton/>
                        </Grid>
                        <Grid item sx={styles.padding(1)}>
                            <CustomizableButton/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);
