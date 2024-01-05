import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {constants} from "../../utils/constants.ts";
import {RootState} from "../store.ts";

export let initSelectedTopicSlice: string = '';

const selectedTopicSlice = createSlice({
    name: constants.selectedTopicSlice,
    initialState: initSelectedTopicSlice,
    reducers: {
        setSelectedTopic: (_: any, action: PayloadAction<string>) => action.payload
    },
});

// Export action
export const {setSelectedTopic} = selectedTopicSlice.actions;

// Export value access (useSelector)
export const getSelectedTopic = (state: RootState): string => state.selectedTopicSlice;

// Export reducer as default for the store
export default selectedTopicSlice.reducer;
