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

import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

import {core} from "../../../wailsjs/go/models.ts";


// Default saved values
const saved: Record<string, string> = {
    [constants.sparkplugui_host]: '127.0.0.1',
    [constants.sparkplugui_port]: '1883',
    [constants.sparkplugui_topic]: '#',
};

// Load saved values from localStorage
Object.keys(saved).map((k: string) => saved[k] = localStorage.getItem(k) ?? saved[k]);

// Instanciate initial slice values
export const initMQTTSetupSlice: core.MQTTSetup = {
    host: saved[constants.sparkplugui_host],
    port: saved[constants.sparkplugui_port],
    topic: saved[constants.sparkplugui_topic],
    username: '',
    password: '',
    cacrt: '',
    clientcrt: '',
    clientkey: '',
};


const mqttSetupSlice = createSlice({
    name: constants.mqttSetupSlice,
    initialState: initMQTTSetupSlice,
    reducers: {
        setMQTTSetup: (state: any, action: PayloadAction<core.MQTTSetup>) => {
            // Set values to localStorage
            Object.keys(saved).map((k: string) => localStorage.setItem(k, (action.payload as any)[k.split('_')[1]]));
            Object.assign(state, action.payload);
        },
    },
});

// Export action
export const {setMQTTSetup} = mqttSetupSlice.actions;

// Export value access (useSelector)
export const getMQTTSetup = (state: RootState): core.MQTTSetup => state.mqttSetupSlice;

// Export reducer as default for the store
export default mqttSetupSlice.reducer;
