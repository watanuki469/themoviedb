import { createSlice } from '@reduxjs/toolkit';
import { MovieVideo } from '../../components/models/MovieVideo';

interface IMovieVideotate {
    listMovieVideo: MovieVideo[],
}

const initialState: IMovieVideotate = {
    listMovieVideo: [],
}

const setListMovieVideostate = (state: IMovieVideotate, action: any) => {
    state.listMovieVideo = action.payload
}

export const moviesVideoSlice = createSlice({
    name: 'MovieVideo',
    initialState,
    reducers: {
        setListMovieVideo: (state, action) => setListMovieVideostate(state, action),
    }
})

export const {
    setListMovieVideo,
   } = moviesVideoSlice.actions;

export default moviesVideoSlice.reducer




