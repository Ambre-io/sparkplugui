/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import {configureStore} from '@reduxjs/toolkit'

import customizableSlice from "./data/customizableSlice.ts";
import openedNodesSlice from "./data/openedNodesSlice.ts";
import languageSlice from "./data/languageSlice.ts";
import lastMessagesSlice from "./data/lastMessagesSlice.ts";
import messagesSlice from "./data/messagesSlice.ts";
import mqttFilenamesSlice from "./data/mqttFilenamesSlice.ts";
import mqttSetupSlice from "./data/mqttSetupSlice.ts";
import parentNodesSlice from "./data/parentNodesSlice.ts";
import selectedTopicSlice from "./data/selectedTopicSlice.ts";
import reloadEventSlice from "./events/reloadEventSlice.ts";


export const store = configureStore({
    reducer: {
        // Data
        customizableSlice: customizableSlice,
        openedNodesSlice: openedNodesSlice,
        languageSlice: languageSlice,
        lastMessagesSlice: lastMessagesSlice,
        messagesSlice: messagesSlice,
        mqttFilenamesSlice: mqttFilenamesSlice,
        mqttSetupSlice: mqttSetupSlice,
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
