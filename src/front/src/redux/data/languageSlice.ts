import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants";
import {RootState} from "../store";

const isBrowser = typeof window !== "undefined";
export let initLanguageSlice: string = 'en';
if (isBrowser) {
    const matched = navigator.language.match(/^[a-zA-Z]{2}/);
    if (matched !== null) initLanguageSlice = matched[0];
}

const languageSlice = createSlice({
    name: constants.languageSlice,
    initialState: initLanguageSlice,
    reducers: {
        setLanguage: (_: any, action: PayloadAction<string>) => action.payload
    },
});

// Export action
export const {setLanguage} = languageSlice.actions;

// Export value access (useSelector)
export const getLanguage = (state: RootState): string => state.languageSlice;

// Export reducer as default for the store
export default languageSlice.reducer;
