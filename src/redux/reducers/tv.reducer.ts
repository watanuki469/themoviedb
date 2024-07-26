import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

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

export const fetchTv = (id:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiTv.tv(id),
    ])
        .then((data: any) => {
            if (data) {
                dispatch(setListTv(data));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default TvSlice.reducer




