import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface IPeoplePopularState {
    peoplePopular: any[],
}

const initialState: IPeoplePopularState = {
    peoplePopular: [],
}

const setPeoplePopularState = (state: IPeoplePopularState, action: any) => {
    state.peoplePopular = action.payload
}

const appendListPeoplePopularState = (state: IPeoplePopularState, action: any) => {
    state.peoplePopular = [...state.peoplePopular, ...action.payload];
};

export const peoplePopularSlice = createSlice({
    name: 'peoplePopular',
    initialState,
    reducers: {
        setPeoplePopular: (state, action) => setPeoplePopularState(state, action),
        appendListPeoplePopular: (state, action) => appendListPeoplePopularState(state, action),
    }
})

export const {
    setPeoplePopular,appendListPeoplePopular
} = peoplePopularSlice.actions;

export const fetPopularCeleb = (page=1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiPeoplePopular.peoplePopular(page)
    ])
        .then((data: any) => {
            if (data[0] && data[0].results) {
                if(page===1){
                    dispatch(setPeoplePopular(data[0]?.results));
                }
                else{
                    dispatch(appendListPeoplePopular(data[0]?.results))
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default peoplePopularSlice.reducer




