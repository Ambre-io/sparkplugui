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


const connectedSlice = createSlice({
    name: constants.connectedSlice,
    initialState: false,
    reducers: {
        setConnected: (_: any, action: PayloadAction<boolean>) => action.payload
    },
});

export const {setConnected} = connectedSlice.actions;
export const getConnected = (state: RootState): boolean => state.connectedSlice;
export default connectedSlice.reducer;
