import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MessagesType, MessageType} from "../../utils/types.ts";
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

const initMessagesSlice: MessagesType = [];

const messagesSlice = createSlice({
    name: constants.messagesSlice,
    initialState: initMessagesSlice,
    reducers: {
        setMessages: (state: any, action: PayloadAction<MessageType>) => [...state, action.payload]
    },
});

// Export action
export const {setMessages} = messagesSlice.actions;

// Export value access (useSelector)
export const getMessages = (state: RootState): MessagesType => state.messagesSlice;

// Export reducer as default for the store
export default messagesSlice.reducer;
