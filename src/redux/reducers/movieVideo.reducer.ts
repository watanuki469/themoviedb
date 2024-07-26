import { createSlice } from '@reduxjs/toolkit';
import { MovieVideo } from '../../components/models/MovieVideo';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

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

export const fetchMovieVideos = (id: any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiMovieVideo.movieVideo(id),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                dispatch(setListMovieVideo(data[0].results));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default moviesVideoSlice.reducer




