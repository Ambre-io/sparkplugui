import * as React from 'react';

import {Grid} from "@mui/material";

import {AmbreCard} from "../ambre/AmbreCard";
import {ConnectButton} from "../eventbuttons/ConnectButton";
import {constants} from '../../utils/constants';
import {FoldCardsButton} from "../eventbuttons/FoldCardsButton";
import {OpenNodesButton} from "../eventbuttons/OpenNodesButton";
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {primaryDark} from "../../styles/muiTheme";
import SETTINGS from '../../../../settings.json';
import {styles} from "../../styles/styles";


export const SoftCard: React.FC = () => (
    <AmbreCard title={`${constants.emojiSunglasses} SparkPlugUI`} name={constants.cards.softCard}>
        <Grid container>
            <Grid item sx={styles.softContainer}>
                <img style={styles.softLogo} alt='SparkplugUI logo' src='/images/logo.svg'/>
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
                        <OpenNodesButton/>
                    </Grid>
                    <Grid item sx={styles.padding(1)}>
                        <FoldCardsButton/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </AmbreCard>
);
