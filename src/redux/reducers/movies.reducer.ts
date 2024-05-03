import { createSlice } from '@reduxjs/toolkit';
import { ListMoviesPopular } from '../../components/models/ListMoviesPopular';
import axiosClient from '../axios/axiosClient';
import { AppDispatch } from "../store";
const language = localStorage.getItem('language')
const apiRequests = {
    netflixOriginal() {
        const url = `discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        return axiosClient.get(url)
    },
    discoverMovies() {
        const url = `discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        return axiosClient.get(url)
    },
    discoverTv() {
        const url = `discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
        return axiosClient.get(url)
    },

    mostPopularMoviesReq() {
        const url = `movie/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=1`
        return axiosClient.get(url)
    },
    topRatedMoviesReq() {
        const url = `movie/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=1`
        return axiosClient.get(url)
    },
    mostPopularTvReq() {
        const url = `tv/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=1`
        return axiosClient.get(url)
    },
    topRatedTvReq() {
        const url = `tv/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=1`
        return axiosClient.get(url)
    },

}

interface IMoviesState {
    isFetched: boolean,
    listNetflixOriginal: any[],
    discoverMovies: any[],
    discoverTv: any[],
    listMoviesPopular: ListMoviesPopular[],
    listMoviesTopRated: any[],
    listMostPopularTvReq: any[],
    listTopRatedTvReq: any[],
}

const initialState: IMoviesState = {
    isFetched: false,
    listNetflixOriginal: [],
    discoverMovies: [],
    discoverTv: [],
    listMoviesPopular: [],
    listMoviesTopRated: [],
    listMostPopularTvReq: [],
    listTopRatedTvReq: [],
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
} = moviesSlice.actions;

export const fetchMovies = () => (dispatch: AppDispatch) => {
    Promise.all([
        apiRequests.netflixOriginal(),
        apiRequests.discoverMovies(),
        apiRequests.discoverTv(),
        apiRequests.mostPopularMoviesReq(),
        apiRequests.topRatedMoviesReq(),
        apiRequests.mostPopularTvReq(),
        apiRequests.topRatedTvReq(),
    ])
        .then((data: any) => {
            if (data[0] && data[0].results) {
                dispatch(setListOriginal(data[0].results));
                dispatch(setDiscoverMovies(data[1].results));
                dispatch(setDiscoverTv(data[2].results));
                dispatch(setListPopular(data[3].results));
                dispatch(setListTopRated(data[4].results));
                dispatch(setMostPopularTv(data[5].results));
                dispatch(setTopRatedTv(data[6].results));
            } else {
                console.error("API response structure is not as expected.", data);
            }
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




