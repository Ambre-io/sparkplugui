import * as React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {AmbreLightSpan} from "../ambre/AmbreSpan";
import SETTINGS from '../../../../../settings.json';
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {styles} from "../../styles/styles";


const SPARKPLUGUI_INFO = {version: SETTINGS.version};


export const SoftCard: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid container sx={{flexGrow: 1}} justifyContent='center'>
            <Grid item xs={11} md={10}>
                <Grid container sx={{flexGrow: 1}} justifyContent='center'>
                    <Grid item>
                        <Grid sx={styles.softCard} container justifyContent='center'>
                            <Grid item sx={styles.sparkpluguiLogoContainer}>
                                <img style={styles.sparkpluguiLogo} alt='SparkplugUI logo' src='/images/logo.svg'/>
                                <div style={styles.sparkplugui}>{t('sparkplugui')}</div>
                                <div style={styles.sparkpluguiInfo}>
                                    {t('sparkpluguiInfo', SPARKPLUGUI_INFO)},
                                    <AmbreLightSpan> {SETTINGS.creator.name}</AmbreLightSpan>
                                </div>
                            </Grid>
                            <Grid item>
                                <LanguageSelection/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
