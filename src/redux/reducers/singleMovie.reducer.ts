import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axiosClient';
import { AppDispatch } from "../store";
import apiController from '../client/api.Controller.';

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
    name: 'movies',
    initialState,
    reducers: {
        setListSingleMovie: (state, action) => setListSingleMovieState(state, action),
    }
})

export const {
    setListSingleMovie,
   } = moviesSlice.actions;

export default moviesSlice.reducer




