import { createSlice } from '@reduxjs/toolkit';
import { MovieSimilar } from '../../components/models/MovieSimilar';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface IMovieSimilartate {
    listMovieSimilar: MovieSimilar[],
}

const initialState: IMovieSimilartate = {
    listMovieSimilar: [],
}

const setListMovieSimilarstate = (state: IMovieSimilartate, action: any) => {
    state.listMovieSimilar = action.payload
}

export const moviesSimilarslice = createSlice({
    name: 'MovieSimilar',
    initialState,
    reducers: {
        setListMovieSimilar: (state, action) => setListMovieSimilarstate(state, action),
    }
})

export const {
    setListMovieSimilar,
} = moviesSimilarslice.actions;

export const fetchMovieSimilar = (id: any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiMovieSimilar.movieSimilar(id),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                dispatch(setListMovieSimilar(data[0]?.results));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}


export default moviesSimilarslice.reducer




