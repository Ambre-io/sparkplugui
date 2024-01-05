import {configureStore} from '@reduxjs/toolkit'

import cardSlice from "./data/CardSlice.ts";
import openedNodesSlice from "./data/openedNodesSlice.ts";
import languageSlice from "./data/languageSlice.ts";
import lastMessagesSlice from "./data/lastMessagesSlice.ts";
import messagesSlice from "./data/messagesSlice.ts";
import mqttDataSlice from "./data/mqttDataSlice.ts";
import parentNodesSlice from "./data/parentNodesSlice.ts";
import selectedTopicSlice from "./data/selectedTopicSlice.ts";
import reloadEventSlice from "./events/reloadEventSlice.ts";


export const store = configureStore({
    reducer: {
        // Data
        cardSlice: cardSlice,
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
