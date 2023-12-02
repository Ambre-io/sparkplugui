import {configureStore} from '@reduxjs/toolkit'

import openedNodesSlice from "./data/openedNodesSlice";
import languageSlice from "./data/languageSlice";
import lastMessagesSlice from "./data/lastMessagesSlice";
import messagesSlice from "./data/messagesSlice";
import mqttDataSlice from "./data/mqttDataSlice";
import parentNodesSlice from "./data/parentNodesSlice";
import selectedTopicSlice from "./data/selectedTopicSlice";
import reloadEventSlice from "./events/reloadEventSlice";


export const store = configureStore({
    reducer: {
        // Data
        openedNodesSlice: openedNodesSlice,
        languageSlice: languageSlice,
        lastMessagesSlice: lastMessagesSlice,
        messagesSlice: messagesSlice,
        mqttDataSlice: mqttDataSlice,
        parentNodesSlice: parentNodesSlice,
        selectedTopicSlice: selectedTopicSlice,
        // Events
        reloadEventSlice: reloadEventSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
