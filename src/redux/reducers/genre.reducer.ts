import { createSlice } from '@reduxjs/toolkit';

interface IGenretate {
    listGenre: any[],
    listGenre2: any[],
}

const initialState: IGenretate = {
    listGenre: [],
    listGenre2: [],
}

const setListGenreState = (state: IGenretate, action: any) => {
    state.listGenre = action.payload
}

const setListGenreState2 = (state: IGenretate, action: any) => {
    state.listGenre2 = action.payload
}

export const GenreSlice = createSlice({
    name: 'Genre',
    initialState,
    reducers: {
        setListGenre: (state, action) => setListGenreState(state, action),
        setListGenre2: (state, action) => setListGenreState2(state, action),
    }
})

export const {
    setListGenre,
    setListGenre2,
   } = GenreSlice.actions;

export default GenreSlice.reducer




