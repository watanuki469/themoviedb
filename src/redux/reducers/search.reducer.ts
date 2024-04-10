import { createSlice } from '@reduxjs/toolkit';

interface ISearchtate {
    listSearch: any[],
}

const initialState: ISearchtate = {
    listSearch: [],
}

const setListSearchstate = (state: ISearchtate, action: any) => {
    state.listSearch = action.payload
}

export const searchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        setListSearch: (state, action) => setListSearchstate(state, action),
    }
})

export const {
    setListSearch,
   } = searchSlice.actions;

export default searchSlice.reducer




