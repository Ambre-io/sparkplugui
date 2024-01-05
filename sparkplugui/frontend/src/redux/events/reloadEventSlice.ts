import {createSlice} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";


export const initReloadEventSlice: boolean = true;

const reloadEventSlice = createSlice({
    name: constants.reloadEventSlice,
    initialState: initReloadEventSlice,
    reducers: {
        setReloadEvent: (state) => !state
    },
});

// Export action
export const {setReloadEvent} = reloadEventSlice.actions;

// Export value access (useSelector)
export const getReloadEvent = (state: RootState): boolean => state.reloadEventSlice;

// Export reducer as default for the store
export default reloadEventSlice.reducer;
