import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import apiController from '../client/api.Controller.';

interface ITvImagetate {
    listNetwork: any[],
}

const initialState: ITvImagetate = {
    listNetwork: [],
}

const setlistNetworkstate = (state: ITvImagetate, action: any) => {
    state.listNetwork = action.payload
}

const setAppendListNetworkstate = (state: ITvImagetate, action: any) => {
    state.listNetwork = [...state.listNetwork, ...action.payload]
}

export const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        setlistNetwork: (state, action) => setlistNetworkstate(state, action),
        setListAppendNetWork:(state,action)=>setAppendListNetworkstate(state,action)
    }
})

export const {
    setlistNetwork,setListAppendNetWork
} = keywordSlice.actions;
export const fetchNetwork = (id:any,page=1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiController.apiNetwork.network(id)
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.results) {
                if(page===1){
                    dispatch(setlistNetwork(data[0]?.results));
                }
                else{
                    dispatch(setListAppendNetWork(data[0]?.results))
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default keywordSlice.reducer




