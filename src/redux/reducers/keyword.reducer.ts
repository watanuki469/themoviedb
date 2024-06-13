import { createSlice } from '@reduxjs/toolkit';

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

export default keywordSlice.reducer




