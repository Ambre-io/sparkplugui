import * as React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {getLanguage, setLanguage} from "../../redux/data/languageSlice";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";


const Languages = constants.availableLanguages.map((lng: string, i: number) => <MenuItem key={`${lng}${i}`} value={lng}>{lng}</MenuItem>);


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
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel>{t('language')}</InputLabel>
            <Select
                value={language}
                onChange={goClickLanguage}
            >
                {Languages}
            </Select>
        </FormControl>
    );
}
