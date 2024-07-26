import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface IMovieImagetate {
    listMovieImage: any[],
}

const initialState: IMovieImagetate = {
    listMovieImage: [],
}

const setListMovieImagestate = (state: IMovieImagetate, action: any) => {
    state.listMovieImage = action.payload
}

export const moviesImageslice = createSlice({
    name: 'movieImage',
    initialState,
    reducers: {
        setListMovieImage: (state, action) => setListMovieImagestate(state, action),
    }
})

export const {
    setListMovieImage,
} = moviesImageslice.actions;

export const fetchMovieImage = (id:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiMovieImage.movieImage(id),
    ])
        .then((data: any) => {
            if (data) {
                dispatch(setListMovieImage(data));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default moviesImageslice.reducer




