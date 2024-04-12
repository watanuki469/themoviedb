import { createSlice } from '@reduxjs/toolkit';

interface IUpComingtate {
    listUpComing: any[],
}

const initialState: IUpComingtate = {
    listUpComing: [],
}

const setListUpComingState = (state: IUpComingtate, action: any) => {
    state.listUpComing = action.payload
}

export const UpComingSlice = createSlice({
    name: 'upComing',
    initialState,
    reducers: {
        setListUpComing: (state, action) => setListUpComingState(state, action),
    }
})

export const {
    setListUpComing,
   } = UpComingSlice.actions;

export default UpComingSlice.reducer




