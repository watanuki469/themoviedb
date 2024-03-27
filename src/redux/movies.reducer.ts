import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "./store";
import axios from "axios";

const apiRequests = {
    netflixOriginal: `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    discoverMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    discoverTv: `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,
    mostPopularMoviesReq: `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=fr-FR&page=1`,
    topRatedMoviesReq: `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`,
    latestMoviesReq: `https://api.themoviedb.org/3/movie/latest?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`,
    mostPopularTvReq: `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`,
    topRatedTvReq: `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=1`,
    latestTvReq: `https://api.themoviedb.org/3/tv/latest?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`,

}

// Var dans le redux loading Boolean
// lors du dispatch du init  dispatch = true
//.then  .catch .celui-la dispatch=false
//Create component de Loading et le faire apparaitre quand ca passe a false

interface IMoviesState {
    isFetched: boolean,
    listNetflixOriginal: any[],
    discoverMovies: any[],
    discoverTv: any[],
    listMoviesPopular: any[],
    listMoviesTopRated: any[],
    latestMoviesReq: any[],
    listMostPopularTvReq: any[],
    listTopRatedTvReq: any[],
    latestTvReq: any[],
}

const initialState: IMoviesState = {
    isFetched: false,
    listNetflixOriginal: [],
    discoverMovies: [],
    discoverTv: [],
    listMoviesPopular: [],
    listMoviesTopRated: [],
    latestMoviesReq: [],
    listMostPopularTvReq: [],
    listTopRatedTvReq: [],
    latestTvReq: [],
}

const setListNetflixOriginalState = (state: IMoviesState, action: any) => {
    state.listNetflixOriginal = action.payload
}

const setListDiscoverMoviesState = (state: IMoviesState, action: any) => {
    state.discoverMovies = action.payload
}

const setListDiscoverTvState = (state: IMoviesState, action: any) => {
    state.discoverTv = action.payload
}

const setListPopularState = (state: IMoviesState, action: any) => {
    state.listMoviesPopular = action.payload
    // state.listMoviesPopular = [action.payload,...state.listMoviesPopular]
}

const setListTopRatedState = (state: IMoviesState, action: any) => {
    state.listMoviesTopRated = action.payload
}

const setMostPopularTvState = (state: IMoviesState, action: any) => {
    state.listMostPopularTvReq = action.payload
}

const setTopRatedTvState = (state: IMoviesState, action: any) => {
    state.listTopRatedTvReq = action.payload
}

const setIsFetchedState = (state: IMoviesState, action: any) => {
    state.isFetched = action.payload
}

const setListLatestMoviesState = (state: IMoviesState, action: any) => {
    state.latestMoviesReq = action.payload
}

const setListLatestTvState = (state: IMoviesState, action: any) => {
    state.latestTvReq = action.payload
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setListOriginal: (state, action) => setListNetflixOriginalState(state, action),
        setDiscoverMovies: (state, action) => setListDiscoverMoviesState(state, action),
        setDiscoverTv: (state, action) => setListDiscoverTvState(state, action),
        setListPopular: (state, action) => setListPopularState(state, action),
        setListTopRated: (state, action) => setListTopRatedState(state, action),
        setMostPopularTv: (state, action) => setMostPopularTvState(state, action),
        setTopRatedTv: (state, action) => setTopRatedTvState(state, action),
        setIsFetched: (state, action) => setIsFetchedState(state, action),
        setLatestMovies: (state, action) => setListLatestMoviesState(state, action),
        setLatestTv: (state, action) => setListLatestTvState(state, action),
    }
})

export const {
    setListOriginal,
    setDiscoverMovies,
    setDiscoverTv,
    setListPopular,
    setListTopRated,
    setMostPopularTv,
    setTopRatedTv,
    setIsFetched,
    setLatestMovies,
    setLatestTv
} = moviesSlice.actions;

export const fetchMovies = () => (dispatch: AppDispatch) => {

    Promise.all([
        axios.get(apiRequests.netflixOriginal),
        axios.get(apiRequests.discoverMovies),
        axios.get(apiRequests.discoverTv),
        axios.get(apiRequests.mostPopularMoviesReq),
        axios.get(apiRequests.topRatedMoviesReq),
        axios.get(apiRequests.mostPopularTvReq),
        axios.get(apiRequests.topRatedTvReq),
        axios.get(apiRequests.latestMoviesReq),
        axios.get(apiRequests.latestTvReq),
    ])
        .then((data) => {
            //TODO : Faire un Setter qui Set automatiquement les bonnes responses dans le bon Setter*
            dispatch(setListOriginal(data[0].data.results));
            dispatch(setDiscoverMovies(data[1].data.results));
            dispatch(setDiscoverTv(data[2].data.results));
            dispatch(setListPopular(data[3].data.results));
            dispatch(setListTopRated(data[4].data.results));
            dispatch(setMostPopularTv(data[5].data.results));
            dispatch(setTopRatedTv(data[6].data.results));
            dispatch(setLatestMovies(data[7].data.results));
            dispatch(setLatestTv(data[8].data.results));
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


export default moviesSlice.reducer




