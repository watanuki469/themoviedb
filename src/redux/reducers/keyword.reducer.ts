import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface ITvImagetate {
    listKeyWord: any[],
}

const initialState: ITvImagetate = {
    listKeyWord: [],
}

const setlistKeyWordstate = (state: ITvImagetate, action: any) => {
    state.listKeyWord = action.payload
}

export const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        setlistKeyWord: (state, action) => setlistKeyWordstate(state, action),
    }
})

export const {
    setlistKeyWord,
} = keywordSlice.actions;
export const fetchKeyword = (id:any,mediaType:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiKeyword.keyword(id, mediaType)
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                dispatch(setlistKeyWord(data[0]?.results));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default keywordSlice.reducer




