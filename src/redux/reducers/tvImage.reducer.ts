import { createSlice } from '@reduxjs/toolkit';

interface ITvImagetate {
    listTvImage: any[],
}

const initialState: ITvImagetate = {
    listTvImage: [],
}

const setListTvImagestate = (state: ITvImagetate, action: any) => {
    state.listTvImage = action.payload
}

export const tvsImageslice = createSlice({
    name: 'TvImage',
    initialState,
    reducers: {
        setListTvImage: (state, action) => setListTvImagestate(state, action),
    }
})

export const {
    setListTvImage,
   } = tvsImageslice.actions;

export default tvsImageslice.reducer




