/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import * as React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {availableLanguages} from "../../i18n/i18next.ts";
import {getLanguage, setLanguage} from "../../redux/data/languageSlice.ts";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";


const Languages = availableLanguages.map((lng: string, i: number) => (
    <MenuItem key={`${lng}${i}`} value={lng}>{lng}</MenuItem>
));


export const LanguageSelection: React.FC = () => {

    const language = useSelector(getLanguage);

    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();

    const goClickLanguage = (event: SelectChangeEvent) => {
        const newLanguage: string = event.target.value;
        i18n.changeLanguage(newLanguage).catch((e) => console.error('Error: fail to change language', e));
        dispatch(setLanguage(newLanguage));
    };

    return (
        <FormControl variant="standard" sx={{minWidth: 80, margin: 0}}>
            <InputLabel sx={{color: (theme) => theme.palette.primary.main}}>{t('language')}</InputLabel>
            <Select
                value={language}
                onChange={goClickLanguage}
                sx={{'&:before': {borderColor: (theme) => theme.palette.primary.main}}}
            >
                {Languages}
            </Select>
        </FormControl>
    );
}
