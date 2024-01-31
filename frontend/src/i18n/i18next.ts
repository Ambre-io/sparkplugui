/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import {initLanguageSlice} from "../redux/data/languageSlice.ts";
import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';
import uk from './uk.json';
import ru from './ru.json';
import ja from './ja.json';
import ar from './ar.json';
import zh from './zh.json';
import uy from './uy.json';
import es from './es.json';
import ku from './ku.json';
import zu from './zu.json';


export const availableLanguages = ['fr', 'en', 'de', 'it', 'uk', 'ru', 'ja', 'ar', 'zh', 'uy', 'es', 'ku', 'zu'].sort();

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {translation: en},
            fr: {translation: fr},
            de: {translation: de},
            it: {translation: it},
            uk: {translation: uk},
            ru: {translation: ru},
            ja: {translation: ja},
            ar: {translation: ar},
            zh: {translation: zh},
            uy: {translation: uy},
            es: {translation: es},
            ku: {translation: ku},
            zu: {translation: zu},
        },
        lng: initLanguageSlice,
        fallbackLng: availableLanguages,
        interpolation: {escapeValue: false} // react already safes from xss
    }).catch(e => console.error('Error: fail to init internationalization', e));

export default i18n;
