import { createSlice } from '@reduxjs/toolkit';

interface IMovieNewtate {
    listMovieNew: any[],
}

const initialState: IMovieNewtate = {
    listMovieNew: [],
}

const setListMovieNewState = (state: IMovieNewtate, action: any) => {
    state.listMovieNew = action.payload
}

export const MovieNewSlice = createSlice({
    name: 'MovieNew',
    initialState,
    reducers: {
        setListMovieNew: (state, action) => setListMovieNewState(state, action),
    }
})

export const {
    setListMovieNew,
   } = MovieNewSlice.actions;

export default MovieNewSlice.reducer




