import { createSlice } from '@reduxjs/toolkit';

interface IPeoplePopularState {
    peoplePopular: any[],
}

const initialState: IPeoplePopularState = {
    peoplePopular: [],
}

const setPeoplePopularState = (state: IPeoplePopularState, action: any) => {
    state.peoplePopular = action.payload
}

export const peoplePopularSlice = createSlice({
    name: 'peoplePopular',
    initialState,
    reducers: {
        setPeoplePopular: (state, action) => setPeoplePopularState(state, action),
    }
})

export const {
    setPeoplePopular,
   } = peoplePopularSlice.actions;

export default peoplePopularSlice.reducer




