import { createSlice } from '@reduxjs/toolkit';
import { MovieCredit } from '../../components/models/MovieCredit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

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

export const fetchMovieCredit = (id:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiMovieCredits.movieCredit(id),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.cast) {
                dispatch(setListMovieCredit(data[0]?.cast));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default movieCreditSlice.reducer




