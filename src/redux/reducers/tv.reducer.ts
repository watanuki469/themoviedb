import { createSlice } from '@reduxjs/toolkit';

interface ITvtate {
    listTv: any[],
}

const initialState: ITvtate = {
    listTv: [],
}

const setListTvState = (state: ITvtate, action: any) => {
    state.listTv = action.payload
}

export const TvSlice = createSlice({
    name: 'Tv',
    initialState,
    reducers: {
        setListTv: (state, action) => setListTvState(state, action),
    }
})

export const {
    setListTv,
   } = TvSlice.actions;

export default TvSlice.reducer




