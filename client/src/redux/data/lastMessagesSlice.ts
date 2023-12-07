import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {constants} from "../../utils/constants";
import {RootState} from "../store";
import {LastMessagesType, MessagesType, MessageType} from "../../utils/types";


export const initLastMessagesSlice: LastMessagesType = {}; // Record<topic, message>

const lastMessagesSlice = createSlice({
    name: constants.lastMessagesSlice,
    initialState: initLastMessagesSlice,
    reducers: {
        setLastMessages: (state: any, action: PayloadAction<LastMessagesType>) => {
            Object.assign(state, action.payload);
        }
    },
});

// Export action
export const {setLastMessages} = lastMessagesSlice.actions;

// Export value access (useSelector)
export const getLastMessages = (state: RootState): LastMessagesType => state.lastMessagesSlice;

// Export reducer as default for the store
export default lastMessagesSlice.reducer;
