import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants";
import {RootState} from "../store";

export let initLastMessageSlice: any = null;

const lastMessageSlice = createSlice({
    name: constants.lastMessageSlice,
    initialState: initLastMessageSlice,
    reducers: {
        setLastMessage: (state: any, action: PayloadAction<string>) => action.payload
    },
});

// Export action
export const {setLastMessage} = lastMessageSlice.actions;

// Export value access (useSelector)
export const getLastMessage = (state: RootState): string => state.lastMessageSlice;

// Export reducer as default for the store
export default lastMessageSlice.reducer;
