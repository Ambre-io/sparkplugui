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

import {FilenamesType} from "../../utils/types.ts";
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";


export const initMQTTFilenamesSlice: FilenamesType = {
    cacrt: '',
    clientcrt: '',
    clientkey: '',
};

const mqttFilenamesSlice = createSlice({
    name: constants.mqttFilenamesSlice,
    initialState: initMQTTFilenamesSlice,
    reducers: {
        setMQTTFilenames: (state: any, action: PayloadAction<FilenamesType>) => {
            Object.assign(state, action.payload);
        },
    },
});

// Export action
export const {setMQTTFilenames} = mqttFilenamesSlice.actions;

// Export value access (useSelector)
export const getMQTTFilenames = (state: RootState): FilenamesType => state.mqttFilenamesSlice;

// Export reducer as default for the store
export default mqttFilenamesSlice.reducer;
