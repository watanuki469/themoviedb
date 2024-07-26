import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';
import { toast } from 'react-toastify';

interface IUpComingtate {
    listUpComing: any[],
}

const initialState: IUpComingtate = {
    listUpComing: [],
}

const setListUpComingState = (state: IUpComingtate, action: any) => {
    state.listUpComing = action.payload
}
const appendListUpComingState = (state: IUpComingtate, action: any) => {
    state.listUpComing = [...state.listUpComing, ...action.payload];
};

export const UpComingSlice = createSlice({
    name: 'upComing',
    initialState,
    reducers: {
        setListUpComing: (state, action) => setListUpComingState(state, action),
        appendListUpComing: (state, action) => appendListUpComingState(state, action),
        clearListUpComing(state) { state.listUpComing = []; },
    }
})

export const {
    setListUpComing,
    appendListUpComing,
    clearListUpComing
} = UpComingSlice.actions;

export const fetchUpComing = (mediatype: any, page = 1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiUpComing.upComing(mediatype, page),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                if (page === 1) {
                    dispatch(setListUpComing(data[0]?.results));
                }
                else {
                    dispatch(appendListUpComing(data[0]?.results))
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default UpComingSlice.reducer




