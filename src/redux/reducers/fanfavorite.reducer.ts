import { createSlice } from '@reduxjs/toolkit';

interface IFanFavoritetate {
    listFanFavorite: any[],
}

const initialState: IFanFavoritetate = {
    listFanFavorite: [],
}

const setListFanFavoriteState = (state: IFanFavoritetate, action: any) => {
    state.listFanFavorite = action.payload
}

export const FanFavoriteSlice = createSlice({
    name: 'FanFavorite',
    initialState,
    reducers: {
        setListFanFavorite: (state, action) => setListFanFavoriteState(state, action),
    }
})

export const {
    setListFanFavorite,
   } = FanFavoriteSlice.actions;

export default FanFavoriteSlice.reducer




