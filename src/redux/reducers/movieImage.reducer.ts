import { createSlice } from '@reduxjs/toolkit';

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

export default moviesImageslice.reducer




