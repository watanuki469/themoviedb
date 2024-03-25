import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTopMeter } from "../models/getTopMeter";
import { RootState } from "../app/store";


export interface getTopMeterState {
    list: getTopMeter[]
}

const initialState: getTopMeterState = {
    list: []
}

const getTopMeterSlice = createSlice({
    name: 'getTopMeter',
    initialState,
    reducers: {
        fetchGetTopMeterList(state, action: PayloadAction<any>) {

        },
        fetchGetTopMeterListSuccess(state, action: PayloadAction<any>) {
            state.list = action.payload.results

        },
        fetchGetTopMeterFailed(state, action: PayloadAction<any>) {

        }
    }
})

//Actions
export const StarActions = getTopMeterSlice.actions

//Selectors

// Reducer
const StarReducer = getTopMeterSlice.reducer;
export default StarReducer
