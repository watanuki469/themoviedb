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

const setlistAppendKeyWordstate = (state: ITvImagetate, action: any) => {
    state.listKeyWord = [...state.listKeyWord, ...action.payload]
}



export const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        setlistKeyWord: (state, action) => setlistKeyWordstate(state, action),
        setlistAppendKeyWord: (state, action) => setlistAppendKeyWordstate(state, action),
    }
})

export const {
    setlistKeyWord, setlistAppendKeyWord
} = keywordSlice.actions;
export const fetchKeyword = (id: any, mediaType: any, page = 1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiKeyword.keyword(id, mediaType, page)
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                if (page === 1) {
                    dispatch(setlistKeyWord(data[0]?.results));
                }
                else {
                    dispatch(setlistAppendKeyWord(data[0]?.results));
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default keywordSlice.reducer




