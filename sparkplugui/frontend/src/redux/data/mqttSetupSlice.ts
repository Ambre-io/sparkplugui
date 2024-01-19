import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MQTTSetupType} from "../../utils/types.ts";
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

export const initMQTTSetupSlice: MQTTSetupType = {
    host: '127.0.0.1',
    port: '1883',
    username: '',
    password: '',
    topic: '#'
}

const mqttSetupSlice = createSlice({
    name: constants.mqttSetupSlice,
    initialState: initMQTTSetupSlice,
    reducers: {
        setMQTTSetup: (state: any, action: PayloadAction<MQTTSetupType>) => {
            Object.assign(state, action.payload);
        },
    },
});

// Export action
export const {setMQTTSetup} = mqttSetupSlice.actions;

// Export value access (useSelector)
export const getMQTTSetup = (state: RootState): MQTTSetupType => state.mqttSetupSlice;

// Export reducer as default for the store
export default mqttSetupSlice.reducer;
