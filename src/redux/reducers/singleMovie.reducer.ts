import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';
import { setListMovieVideo } from './movieVideo.reducer';

interface ISingleMovieState {
    listSingleMovie: any[],
}

const initialState: ISingleMovieState = {
    listSingleMovie: [],
}

const setListSingleMovieState = (state: ISingleMovieState, action: any) => {
    state.listSingleMovie = action.payload
}

export const moviesSlice = createSlice({
    name: 'singleMovies',
    initialState,
    reducers: {
        setListSingleMovie: (state, action) => setListSingleMovieState(state, action),
    }
})

export const {
    setListSingleMovie,
} = moviesSlice.actions;

export const fetchSingleMovies = (id: any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiSingleMovieRequests.singleMovie(id),
    ])
        .then((data: any) => {
            if (data) {
                dispatch(setListSingleMovie(data));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}



export default moviesSlice.reducer




