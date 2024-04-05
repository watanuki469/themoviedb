import { createSlice } from '@reduxjs/toolkit';
import { MovieSimilar } from '../../components/models/MovieSimilar';

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

export default moviesSimilarslice.reducer




