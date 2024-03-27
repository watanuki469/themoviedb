import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "./store";
import axios from "axios";

const apiRequests = {
    netflixOriginal: `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    discoverTv: `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,
    mostPopularTvReq: `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`,
    topRatedTvReq: `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`,
    onTheAirTvReq: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`
}

interface ITvShowState {
    isFetched: boolean,
    listNetflixOriginal: any[],
    discoverTv: any[],
    listMostPopularTvReq: any[],
    listTopRatedTvReq: any[],
    onTheAirTvReq: any[],
}

const initialState: ITvShowState = {
    isFetched: false,
    listNetflixOriginal: [],
    discoverTv: [],
    listMostPopularTvReq: [],
    listTopRatedTvReq: [],
    onTheAirTvReq: [],
}

const setListNetflixOriginalState = (state: ITvShowState, action: any) => {
    state.listNetflixOriginal = action.payload
}

const setListDiscoverTvState = (state: ITvShowState, action: any) => {
    state.discoverTv = action.payload
}

const setMostPopularTvState = (state: ITvShowState, action: any) => {
    state.listMostPopularTvReq = action.payload
}

const setTopRatedTvState = (state: ITvShowState, action: any) => {
    state.listTopRatedTvReq = action.payload
}

const setIsFetchedState = (state: ITvShowState, action: any) => {
    state.isFetched = action.payload
}

const setListonTheAirTvState = (state: ITvShowState, action: any) => {
    state.onTheAirTvReq = action.payload
}

export const tvSlice = createSlice({
    name: 'tvshow',
    initialState,
    reducers: {
        setListOriginal: (state, action) => setListNetflixOriginalState(state, action),
        setDiscoverTv: (state, action) => setListDiscoverTvState(state, action),
        setMostPopularTv: (state, action) => setMostPopularTvState(state, action),
        setTopRatedTv: (state, action) => setTopRatedTvState(state, action),
        setIsFetched: (state, action) => setIsFetchedState(state, action),
        setonTheAirTv: (state, action) => setListonTheAirTvState(state, action),
    }
})

export const {
    setListOriginal,
    setDiscoverTv,
    setMostPopularTv,
    setTopRatedTv,
    setIsFetched,
    setonTheAirTv
} = tvSlice.actions;

export const fetchTvShows = () => (dispatch: AppDispatch) => {

    Promise.all([
        axios.get(apiRequests.netflixOriginal),
        axios.get(apiRequests.discoverTv),
        axios.get(apiRequests.mostPopularTvReq),
        axios.get(apiRequests.topRatedTvReq),
        axios.get(apiRequests.onTheAirTvReq),

    ])
        .then((data) => {

            dispatch(setListOriginal(data[0].data.results));
            dispatch(setDiscoverTv(data[1].data.results));
            dispatch(setMostPopularTv(data[2].data.results));
            dispatch(setTopRatedTv(data[3].data.results));
            dispatch(setonTheAirTv(data[4].data.results));
        })
        .then(() => {
            setTimeout(() => {
                dispatch(setIsFetched(true))
            }, 2000);
        })
        .catch((e) => {
            console.log(e);
        })

}

export default tvSlice.reducer




