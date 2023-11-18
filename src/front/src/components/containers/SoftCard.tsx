import * as React from 'react';

import Grid from "@mui/material/Unstable_Grid2";
import {useTranslation} from "react-i18next";

import {AmbreLightSpan} from "../ambre/AmbreSpan";
import SETTINGS from '../../../../../settings.json';
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {styles} from "../../styles/styles";


export const SoftCard: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid container id='SoftCard' justifyContent='center'>
            <Grid>
                <Grid container sx={{...styles.ambreCard, ...styles.softCard}} justifyContent='center'>
                    <Grid sx={styles.alignCenter} xs={12}>
                        <img style={styles.softLogo} alt='SparkplugUI logo' src='/images/logo.svg'/>
                        <div style={styles.softTitle}>SparkplugUI</div>
                        <div style={styles.softSubTitle}>
                            {SETTINGS.version} by <AmbreLightSpan>{SETTINGS.creator.name}</AmbreLightSpan>
                        </div>
                    </Grid>
                    <Grid sx={styles.alignCenter} xs={12}>
                        <LanguageSelection/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
