/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

export let initLanguageSlice: string = 'en';
const savedLanguage: string | null = localStorage.getItem(constants.languageSlice);
if (savedLanguage !== null) {
    initLanguageSlice = savedLanguage
}

const languageSlice = createSlice({
    name: constants.languageSlice,
    initialState: initLanguageSlice,
    reducers: {
        setLanguage: (_: any, action: PayloadAction<string>) => {
            localStorage.setItem(constants.languageSlice, action.payload);
            return action.payload;
        }
    },
});

// Export action
export const {setLanguage} = languageSlice.actions;

// Export value access (useSelector)
export const getLanguage = (state: RootState): string => state.languageSlice;

// Export reducer as default for the store
export default languageSlice.reducer;
