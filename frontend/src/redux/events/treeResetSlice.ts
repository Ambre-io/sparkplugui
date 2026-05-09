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

import {RootState} from "../store.ts";


const treeResetSlice = createSlice({
    name: 'treeResetSlice',
    initialState: 0,
    reducers: {
        incrementTreeReset: (state: number) => state + 1,
    },
});

export const {incrementTreeReset} = treeResetSlice.actions;
export const getTreeReset = (state: RootState): number => state.treeResetSlice;
export default treeResetSlice.reducer;
