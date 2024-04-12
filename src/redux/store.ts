import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './reducers/movies.reducer'
import globalLoadingReducer from './reducers/globalLoading.reducer'
import appStateSlice from './reducers/appStateSlice'
import singleMovieReducer from './reducers/singleMovie.reducer'
import movieVideoReducer from './reducers/movieVideo.reducer'
import movieImageReducer from './reducers/movieImage.reducer'
import movieCreditReducer from './reducers/movieCredit.reducer'
import movieSimilarReducer from './reducers/movieSimilar.reducer'
import personReducer from './reducers/person.reducer'
import searchReducer from './reducers/search.reducer'
import tvReducer from './reducers/tv.reducer'
import tvImageReducer from './reducers/tvImage.reducer'
import upComingReducer from './reducers/upComing.reducer'

export const store = configureStore({
    reducer: {
        globalLoading: globalLoadingReducer,
        appState: appStateSlice,
        movies: moviesReducer,
        singleMovies: singleMovieReducer,
        movieVideo: movieVideoReducer,
        movieImage: movieImageReducer,
        movieCredit: movieCreditReducer,
        movieSimilar: movieSimilarReducer,
        person: personReducer,
        search: searchReducer,
        tv: tvReducer,
        tvImages: tvImageReducer,
        upComing: upComingReducer

    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch