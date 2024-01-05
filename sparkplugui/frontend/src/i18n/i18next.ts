// Libs
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import {constants} from "../utils/constants.ts";
import {initLanguageSlice} from "../redux/data/languageSlice.ts";
import en from './en.json';
import fr from './fr.json';
import de from './de.json';


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {translation: en},
            fr: {translation: fr},
            de: {translation: de},
        },
        lng: initLanguageSlice,
        fallbackLng: constants.availableLanguages,
        interpolation: {escapeValue: false} // react already safes from xss
    }).catch(e => console.error('Error: fail to init internationalization', e));

export default i18n;
