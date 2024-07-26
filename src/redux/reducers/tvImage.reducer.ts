import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

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

export const fetchTvImages = (id:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiTvImages.tvImage(id),
    ])
        .then((data: any) => {
            if (data) {
                dispatch(setListTvImage(data));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default tvsImageslice.reducer




