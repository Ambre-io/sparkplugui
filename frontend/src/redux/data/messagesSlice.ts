/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MessagesType} from "../../utils/types.ts";
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

import {core} from "../../../wailsjs/go/models.ts";

const MAX_MESSAGES = 2000;

const initMessagesSlice: MessagesType = [];

const messagesSlice = createSlice({
    name: constants.messagesSlice,
    initialState: initMessagesSlice,
    reducers: {
        setMessages: (state: any, action: PayloadAction<core.MQTTMessage>) => {
            state.push(action.payload);
            if (state.length > MAX_MESSAGES) state.splice(0, 1);
        },
        clearMessages: () => [],
    },
});

// Export action
export const {setMessages, clearMessages} = messagesSlice.actions;

// Export value access (useSelector)
export const getMessages = (state: RootState): MessagesType => state.messagesSlice;

// Export reducer as default for the store
export default messagesSlice.reducer;
