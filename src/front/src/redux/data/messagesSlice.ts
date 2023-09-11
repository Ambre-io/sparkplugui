import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MessagesType} from "../../utils/types";
import {constants} from "../../utils/constants";
import {RootState} from "../store";

export const initMQTTDataSlice: MessagesType = [];

const messagesSlice = createSlice({
    name: constants.messagesSlice,
    initialState: initMQTTDataSlice,
    reducers: {
        setMessages: (state: any, action: PayloadAction<MessagesType>) => [...state, action.payload]
    },
});

// Export action
export const { setMessages } = messagesSlice.actions;

// Export value access (useSelector)
export const getMessages = (state: RootState): MessagesType => state.messagesSlice;

// Export reducer as default for the store
export default messagesSlice.reducer;
