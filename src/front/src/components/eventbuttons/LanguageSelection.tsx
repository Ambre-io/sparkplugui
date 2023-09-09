import * as React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {getLanguage, setLanguage} from "../../redux/data/languageSlice";
import {AmbreAutoComplete} from "../ambre/AmbreAutoComplete";
import {AmbreTextField} from "../ambre/AmbreTextField";


export const LanguageSelection: React.FC = () => {

    const language = useSelector(getLanguage);

    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();

    const goClickLanguage = (event: any, lng: unknown) => {
        const newLanguage: string = lng as string;
        i18n.changeLanguage(newLanguage).catch((e) => console.error('Error: fail to change language', e));
        dispatch(setLanguage(newLanguage));
    };

    return (
        <AmbreAutoComplete
            value={language}
            onChange={goClickLanguage}
            options={constants.availableLanguages}
            disableClearable
            filterSelectedOptions
            renderInput={(params) => (
                <AmbreTextField {...params} label={t('language')} variant="standard"/>
            )}
        />
    )
}
