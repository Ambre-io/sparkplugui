import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MQTTDataType} from "../../utils/types.ts";
import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

export const initMQTTDataSlice: MQTTDataType = {
    host: '127.0.0.1',
    port: '1883',
    username: '',
    password: '',
    topic: '#'
}

const mqttDataSlice = createSlice({
    name: constants.mqttDataSlice,
    initialState: initMQTTDataSlice,
    reducers: {
        setMQTTData: (state: any, action: PayloadAction<MQTTDataType>) => {
            Object.assign(state, action.payload);
        },
    },
});

// Export action
export const {setMQTTData} = mqttDataSlice.actions;

// Export value access (useSelector)
export const getMQTTData = (state: RootState): MQTTDataType => state.mqttDataSlice;

// Export reducer as default for the store
export default mqttDataSlice.reducer;