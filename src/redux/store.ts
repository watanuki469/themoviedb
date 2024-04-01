import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './reducers/movies.reducer'
import globalLoadingReducer from './reducers/globalLoading.reducer'
import appStateSlice from './reducers/appStateSlice'
import singleMovieReducer from './reducers/singleMovie.reducer'


export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        globalLoading: globalLoadingReducer,
        appState: appStateSlice,
        singleMovies:singleMovieReducer


    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch