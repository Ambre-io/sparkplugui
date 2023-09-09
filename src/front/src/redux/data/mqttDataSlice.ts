import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {MQTTDataType} from "../../utils/types";
import {constants} from "../../utils/constants";
import {RootState} from "../store";

export const initMQTTDataSlice: MQTTDataType = {
    host: '',
    port: '',
    username: '',
    password: '',
    topic: ''
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
export const { setMQTTData } = mqttDataSlice.actions;

// Export value access (useSelector)
export const getMQTTData = (state: RootState): MQTTDataType => state.mqttDataSlice;

// Export reducer as default for the store
export default mqttDataSlice.reducer;
