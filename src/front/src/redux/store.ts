import {configureStore} from '@reduxjs/toolkit'

import languageSlice from "./data/languageSlice";
import mqttDataSlice from "./data/mqttDataSlice";


export const store = configureStore({
    reducer: {
        // Data
        languageSlice: languageSlice,
        mqttDataSlice: mqttDataSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
