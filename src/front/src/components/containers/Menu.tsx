import * as React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import CONFIG from '../../../config.json';
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {styles} from "../../styles/styles";


const SPARKPLUGUI_INFO = {version: CONFIG.version};


export const Menu: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid sx={{flexGrow: 1}} container>
            <Grid item xs={2}>
                <Grid sx={styles.menu} container justifyContent='center'>
                    <Grid item sx={styles.sparkpluguiLogoContainer}>
                        <img style={styles.sparkpluguiLogo} alt='SparkplugUI logo' src='/images/logo.svg'/>
                        <div style={styles.sparkplugui}>{t('sparkplugui')}</div>
                        <div style={styles.sparkpluguiInfo}>{t('sparkpluguiInfo', SPARKPLUGUI_INFO)}</div>
                    </Grid>
                    <Grid item sx={styles.menuItem}>
                        <LanguageSelection/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
