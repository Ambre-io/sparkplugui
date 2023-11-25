import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {constants} from "../../utils/constants";
import {RootState} from "../store";

export const initLastMessagesSlice: Record<string, string> = {};

const lastMessagesSlice = createSlice({
    name: constants.lastMessagesSlice,
    initialState: initLastMessagesSlice,
    reducers: {
        setLastMessages: (state: any, action: PayloadAction<Record<string, string>>) => {
            Object.assign(state, action.payload);
        }
    },
});

// Export action
export const {setLastMessages} = lastMessagesSlice.actions;

// Export value access (useSelector)
export const getLastMessages = (state: RootState): Record<string, string> => state.lastMessagesSlice;

// Export reducer as default for the store
export default lastMessagesSlice.reducer;
