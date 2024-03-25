import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTopMeter } from "../models/getTopMeter";

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
    }
})

//Actions
export const StarActions = getTopMeterSlice.actions

//Selectors

// Reducer
const StarReducer = getTopMeterSlice.reducer;
export default StarReducer
