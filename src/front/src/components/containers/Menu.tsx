import * as React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import CONFIG from '../../../config.json';
import {LanguageSelection} from "../eventbuttons/LanguageSelection";
import {PublishSettings} from "../eventbuttons/PublishSettings";
import {styles} from "../../styles/styles";


const SPARKPLUGUI_INFO = {
    name: CONFIG.name,
    version: CONFIG.version
};


export const Menu: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11.5}>
                <Grid sx={styles.menu} container alignItems='center'>
                    <Grid item sx={{padding: 0}}>
                        <img style={styles.sparkpluguiLogo} alt='SparkplugUI logo' src='/images/TODO'/>
                        <div style={styles.sparkpluguiInfo}>{t('sparkpluguiInfo', SPARKPLUGUI_INFO)}</div>
                    </Grid>
                    <Grid item sx={styles.menuItem}>
                        <LanguageSelection/>
                    </Grid>
                    <Grid item sx={styles.menuItem}>
                        <PublishSettings/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
