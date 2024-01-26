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


export const initParentNodes: string[] = [constants.rootID];

const parentNodesSlice = createSlice({
    name: constants.parentNodesSlice,
    initialState: initParentNodes,
    reducers: {
        setParentNodes: (state: any, action: PayloadAction<string[]>) => action.payload
    },
});

// Export action
export const {setParentNodes} = parentNodesSlice.actions;

// Export value access (useSelector)
export const getParentNodes = (state: RootState): string[] => state.parentNodesSlice;

// Export reducer as default for the store
export default parentNodesSlice.reducer;
