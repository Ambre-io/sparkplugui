import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {constants} from "../../utils/constants";
import {RootState} from "../store";


export const initExpandedNodes: string[] = [constants.rootID];

const expandedNodesSlice = createSlice({
    name: constants.expandedNodesSlice,
    initialState: initExpandedNodes,
    reducers: {
        setExpandedNodes: (state: any, action: PayloadAction<string[]>) => action.payload
    },
});

// Export action
export const {setExpandedNodes} = expandedNodesSlice.actions;

// Export value access (useSelector)
export const getExpandedNodes = (state: RootState): string[] => state.expandedNodesSlice;

// Export reducer as default for the store
export default expandedNodesSlice.reducer;
