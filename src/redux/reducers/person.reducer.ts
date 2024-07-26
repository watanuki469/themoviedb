import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface IPersontate {
    listPerson: any[],
}

const initialState: IPersontate = {
    listPerson: [],
}

const setListPersonState = (state: IPersontate, action: any) => {
    state.listPerson = action.payload
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setListPerson: (state, action) => setListPersonState(state, action),
    }
})

export const {
    setListPerson,
} = personSlice.actions;

export const fetchPerson = (id:any) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiPerson.person(id),
    ])
        .then((data: any) => {
            if (data) {
                dispatch(setListPerson(data));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default personSlice.reducer




