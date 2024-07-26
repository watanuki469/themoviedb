import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface ISearchtate {
    listSearch: any[],
}

const initialState: ISearchtate = {
    listSearch: [],
}

const setListSearchstate = (state: ISearchtate, action: any) => {
    state.listSearch = action.payload
}

const appendListSearchstate = (state: ISearchtate, action: any) => {
    state.listSearch = [...state.listSearch, ...action.payload]
}

export const searchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        setListSearch: (state, action) => setListSearchstate(state, action),
        setAppendListSearch: (state, action) => appendListSearchstate(state, action),
        clearListSearch(state) { state.listSearch = []; },
    }
})

export const {
    setListSearch, setAppendListSearch,clearListSearch
} = searchSlice.actions;

export const fetchSearch = (mediatype: any, query: any, page = 1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiSearch.search(mediatype, query, page),
    ])
        .then((data: any) => {
            if (data) {
                if (page === 1) {
                    dispatch(setListSearch(data[0]?.results))
                }
                else {
                    dispatch(setAppendListSearch(data[0]?.results))
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default searchSlice.reducer




