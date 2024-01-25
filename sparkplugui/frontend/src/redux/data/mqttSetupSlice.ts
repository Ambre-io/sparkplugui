import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

import {core} from "../../../wailsjs/go/models.ts";


export const initMQTTSetupSlice: core.MQTTSetup = {
    host: '127.0.0.1',
    port: '1883',
    username: '',
    password: '',
    topic: '#',
    cacrt: '',
    clientcrt: '',
    clientkey: '',
};

const mqttSetupSlice = createSlice({
    name: constants.mqttSetupSlice,
    initialState: initMQTTSetupSlice,
    reducers: {
        setMQTTSetup: (state: any, action: PayloadAction<core.MQTTSetup>) => {
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
