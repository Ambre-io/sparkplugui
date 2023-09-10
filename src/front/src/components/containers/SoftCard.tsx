import * as React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {AmbreLightSpan} from "../ambre/AmbreSpan";
import CONFIG from '../../../config.json';
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {styles} from "../../styles/styles";


const SPARKPLUGUI_INFO = {version: CONFIG.version};


export const SoftCard: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid container sx={{flexGrow: 1}} justifyContent='center'>
            <Grid item xs={11}>
                <Grid sx={styles.softCard} container justifyContent='center'>
                    <Grid item sx={styles.sparkpluguiLogoContainer}>
                        <img style={styles.sparkpluguiLogo} alt='SparkplugUI logo' src='/images/logo.svg'/>
                        <div style={styles.sparkplugui}>{t('sparkplugui')}</div>
                        <div style={styles.sparkpluguiInfo}>
                            {t('sparkpluguiInfo', SPARKPLUGUI_INFO)},
                            <AmbreLightSpan> {CONFIG.creator.name}</AmbreLightSpan>
                        </div>
                    </Grid>
                    <Grid item>
                        <LanguageSelection/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
