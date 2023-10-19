import {createSlice} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants";
import {RootState} from "../store";

// This Slice is used as an EVENT HANDLER:
//  - the state is simple number init to 0
//  - the only reducer increment the state
//  - each form (src/components/forms) dispatches an increment on a successful save mutation
//  - App component (src/components/containers) listens with a selector and refetch data on an increment

export const initReloadEventSlice: number = 0;

const reloadEventSlice = createSlice({
    name: constants.reloadEventSlice,
    initialState: initReloadEventSlice,
    reducers: {
        setReloadEvent: (state) => state + 1
    },
});

// Export action
export const { setReloadEvent } = reloadEventSlice.actions;

// Export value access (useSelector)
export const getReloadEvent = (state: RootState): number => state.reloadEventSlice;

// Export reducer as default for the store
export default reloadEventSlice.reducer;
