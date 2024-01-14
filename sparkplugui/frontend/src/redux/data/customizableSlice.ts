import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";


export const initCustomSlice: boolean = false;

const customizableSlice = createSlice({
    name: constants.customizableSlice,
    initialState: initCustomSlice,
    reducers: {
        setCustomizable: (_: any, action: PayloadAction<boolean>) => action.payload
    },
});

// Export action
export const {setCustomizable} = customizableSlice.actions;

// Export value access (useSelector)
export const getCustomizable = (state: RootState): boolean => state.customizableSlice;

// Export reducer as default for the store
export default customizableSlice.reducer;
