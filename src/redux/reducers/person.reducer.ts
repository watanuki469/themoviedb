import { createSlice } from '@reduxjs/toolkit';

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

export default personSlice.reducer




