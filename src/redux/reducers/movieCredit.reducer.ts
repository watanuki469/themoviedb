import { createSlice } from '@reduxjs/toolkit';
import { MovieCredit } from '../../components/models/MovieCredit';

interface IMovieCredittate {
    listMovieCredit: MovieCredit[],
}

const initialState: IMovieCredittate = {
    listMovieCredit: [],
}

const setListMovieCreditstate = (state: IMovieCredittate, action: any) => {
    state.listMovieCredit = action.payload
}

export const movieCreditSlice = createSlice({
    name: 'MovieCredit',
    initialState,
    reducers: {
        setListMovieCredit: (state, action) => setListMovieCreditstate(state, action),
    }
})

export const {
    setListMovieCredit,
   } = movieCreditSlice.actions;

export default movieCreditSlice.reducer




