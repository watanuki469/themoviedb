import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './movies.reducer'
import tvshowReducer from './tvshow.reducer'
import globalLoadingSlice from './globalLoadingSlice'


export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        tvshow: tvshowReducer,
        globalLoading: globalLoadingSlice,

    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch