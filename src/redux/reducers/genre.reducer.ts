import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

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

export const fetchGenre = (mediatype: any) => (dispatch: AppDispatch) => {
    apiController.apiGenre.genre(mediatype)
        .then((data: any) => {
            if (data && data?.genres) {
                dispatch(setListGenre(data?.genres));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const fetchGenre2 = (mediatype: any) => (dispatch: AppDispatch) => {
    apiController.apiGenre.genre(mediatype)
        .then((data: any) => {
            if (data && data?.genres) {
                dispatch(setListGenre2(data?.genres));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        });
};
export function genreMapping(list: { id: number; name: string }[]): Record<number, string> {
    return list.reduce((acc: Record<number, string>, genre: { id: number; name: string }) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});
}

export const genreMapping2 = (listGenreFromApi2: { id: number; name: string }[]): Record<number, string> => {
    return listGenreFromApi2.reduce((acc: Record<number, string>, genre: { id: number; name: string }) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});
};



export default GenreSlice.reducer




