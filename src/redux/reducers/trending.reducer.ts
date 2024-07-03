import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axios/axiosClient';
import { AppDispatch } from "../store";

const language = localStorage.getItem('language')
const apiRequests = {
    NewNetflix() {
        const url = `trending/movie/day?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    NewDisney() {
        const url = `list/5906?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    NewHulu() {
        const url = `trending/tv/day?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    NewPrime() {
        const url = `trending/movie/week?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    NewStream() {
        const url = `trending/person/week?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    NewMax() {
        const url = `trending/tv/week?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    }
}

interface IMoviesState {
    listNewNetflix: any[],
    listNewDisney: any[],
    listNewHulu: any[],
    listNewPrime: any[],
    listNewStream: any[],
    listNewMax: any[],
}

const initialState: IMoviesState = {
    listNewNetflix: [],
    listNewDisney: [],
    listNewHulu: [],
    listNewPrime: [],
    listNewStream: [],
    listNewMax: [],
}

const setListNewNetflixState = (state: IMoviesState, action: any) => {
    state.listNewNetflix = action.payload
}

const setListNewDisneyState = (state: IMoviesState, action: any) => {
    state.listNewDisney = action.payload
}

const setListNewHuluState = (state: IMoviesState, action: any) => {
    state.listNewHulu = action.payload
}

const setNewPrimeState = (state: IMoviesState, action: any) => {
    state.listNewPrime = action.payload
}

const setNewStreamState = (state: IMoviesState, action: any) => {
    state.listNewStream = action.payload
}

const setNewMaxState = (state: IMoviesState, action: any) => {
    state.listNewMax = action.payload
}
export const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        setNewNetflix: (state, action) => setListNewNetflixState(state, action),
        setNewDisney: (state, action) => setListNewDisneyState(state, action),
        setNewHulu: (state, action) => setListNewHuluState(state, action),
        setNewPrime: (state, action) => setNewPrimeState(state, action),
        setNewStream: (state, action) => setNewStreamState(state, action),
        setNewMax: (state, action) => setNewMaxState(state, action),
    }
})

export const {
    setNewNetflix,
    setNewDisney,
    setNewHulu,
    setNewPrime,
    setNewStream,
    setNewMax,
} = trendingSlice.actions;

export const fetchTrending = () => (dispatch: AppDispatch) => {
    Promise.all([
        apiRequests.NewNetflix(),
        apiRequests.NewDisney(),
        apiRequests.NewHulu(),
        apiRequests.NewPrime(),
        apiRequests.NewStream(),
        apiRequests.NewMax(),
    ])
        .then((data: any) => {
            if (data[0] && data[0].results) {
                dispatch(setNewNetflix(data[0].results));
                dispatch(setNewDisney(data[1].items));
                dispatch(setNewHulu(data[2].results));
                dispatch(setNewPrime(data[3].results));
                dispatch(setNewStream(data[4].results));
                dispatch(setNewMax(data[5].results));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default trendingSlice.reducer




