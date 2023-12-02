import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {constants} from "../../utils/constants";
import {RootState} from "../store";


export const initOpenedNodes: string[] = [constants.rootID];

const openedNodesSlice = createSlice({
    name: constants.openedNodesSlice,
    initialState: initOpenedNodes,
    reducers: {
        setOpenedNodes: (state: any, action: PayloadAction<string[]>) => action.payload
    },
});

// Export action
export const {setOpenedNodes} = openedNodesSlice.actions;

// Export value access (useSelector)
export const getOpenedNodes = (state: RootState): string[] => state.openedNodesSlice;

// Export reducer as default for the store
export default openedNodesSlice.reducer;
