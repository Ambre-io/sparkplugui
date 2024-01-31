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

export let initSelectedTopicSlice: string = '';

const selectedTopicSlice = createSlice({
    name: constants.selectedTopicSlice,
    initialState: initSelectedTopicSlice,
    reducers: {
        setSelectedTopic: (_: any, action: PayloadAction<string>) => action.payload
    },
});

// Export action
export const {setSelectedTopic} = selectedTopicSlice.actions;

// Export value access (useSelector)
export const getSelectedTopic = (state: RootState): string => state.selectedTopicSlice;

// Export reducer as default for the store
export default selectedTopicSlice.reducer;
