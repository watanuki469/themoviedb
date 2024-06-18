import { createSlice } from '@reduxjs/toolkit';

interface IFilmtate {
    listFilm: any[],
    singleFilm: any,
}

const initialState: IFilmtate = {
    listFilm: [],
    singleFilm:{}
}

const setListFilmState = (state: IFilmtate, action: any) => {
    state.listFilm = action.payload
}

const setSingleFilmState = (state: IFilmtate, action: any) => {
    state.singleFilm = action.payload
}

export const FilmSlice = createSlice({
    name: 'Film',
    initialState,
    reducers: {
        setListFilm: (state, action) => setListFilmState(state, action),
        setSingleFilm: (state, action) => setSingleFilmState(state, action),
    }
})

export const {
    setListFilm,
    setSingleFilm,
   } = FilmSlice.actions;

export default FilmSlice.reducer




