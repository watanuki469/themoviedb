import { createSlice } from '@reduxjs/toolkit';
import { ListMoviesPopular } from '../../components/models/ListMoviesPopular';
import axiosClient from '../axios/axiosClient';
import { AppDispatch } from "../store";
const language = localStorage.getItem('language')
const apiRequests = {
    netflixOriginal(page=1) {
        const url = `discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
        return axiosClient.get(url)
    },
    discoverMovies(page=1) {
        const url = `discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
        return axiosClient.get(url)
    },
    discoverTv(page=1) {
        const url = `discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
        return axiosClient.get(url)
    },

    mostPopularMoviesReq(page=1) {
        const url = `movie/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    topRatedMoviesReq(page=1) {
        const url = `movie/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    mostPopularTvReq(page=1) {
        const url = `tv/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    topRatedTvReq(page=1) {
        const url = `tv/top_rated?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
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

const appendListNetflixOriginalState = (state: IMoviesState, action: any) => {
    state.listNetflixOriginal = [...state.listNetflixOriginal, ...action.payload];
};

const appendListDiscoverMoviesState = (state: IMoviesState, action: any) => {
    state.discoverMovies = [...state.discoverMovies, ...action.payload];
};

const appendListDiscoverTvState = (state: IMoviesState, action: any) => {
    state.discoverTv = [...state.discoverTv, ...action.payload];
};

const appendListPopularState = (state: IMoviesState, action: any) => {
    state.listMoviesPopular = [...state.listMoviesPopular, ...action.payload];
};

const appendListTopRatedState = (state: IMoviesState, action: any) => {
    state.listMoviesTopRated = [...state.listMoviesTopRated, ...action.payload];
};

const appendMostPopularTvState = (state: IMoviesState, action: any) => {
    state.listMostPopularTvReq = [...state.listMostPopularTvReq, ...action.payload];
};

const appendTopRatedTvState = (state: IMoviesState, action: any) => {
    state.listTopRatedTvReq = [...state.listTopRatedTvReq, ...action.payload];
};


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


        appendListOriginal: (state, action) => appendListNetflixOriginalState(state, action),
        appendDiscoverMovies: (state, action) => appendListDiscoverMoviesState(state, action),
        appendDiscoverTv: (state, action) => appendListDiscoverTvState(state, action),
        appendListPopular: (state, action) => appendListPopularState(state, action),
        appendListTopRated: (state, action) => appendListTopRatedState(state, action),
        appendMostPopularTv: (state, action) => appendMostPopularTvState(state, action),
        appendTopRatedTv: (state, action) => appendTopRatedTvState(state, action),
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

    appendListOriginal,
    appendDiscoverMovies,
    appendDiscoverTv,
    appendListPopular,
    appendListTopRated,
    appendMostPopularTv,
    appendTopRatedTv,
} = moviesSlice.actions;

export const fetchMovies = (page=1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiRequests.netflixOriginal(page),
        apiRequests.discoverMovies(page),
        apiRequests.discoverTv(page),
        apiRequests.mostPopularMoviesReq(page),
        apiRequests.topRatedMoviesReq(page),
        apiRequests.mostPopularTvReq(page),
        apiRequests.topRatedTvReq(page),
    ])
        .then((data: any) => {
            if (data[0] && data[0].results) {
                if (page === 1) {
                    dispatch(setListOriginal(data[0].results));
                    dispatch(setDiscoverMovies(data[1].results));
                    dispatch(setDiscoverTv(data[2].results));
                    dispatch(setListPopular(data[3].results));
                    dispatch(setListTopRated(data[4].results));
                    dispatch(setMostPopularTv(data[5].results));
                    dispatch(setTopRatedTv(data[6].results));
                } else {
                    dispatch(appendListOriginal(data[0].results));
                    dispatch(appendDiscoverMovies(data[1].results));
                    dispatch(appendDiscoverTv(data[2].results));
                    dispatch(appendListPopular(data[3].results));
                    dispatch(appendListTopRated(data[4].results));
                    dispatch(appendMostPopularTv(data[5].results));
                    dispatch(appendTopRatedTv(data[6].results));
                }
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        // .then(() => {
        //     setTimeout(() => {
        //         dispatch(setIsFetched(true))
        //     }, 2000);
        // })
        .catch((e) => {
            console.log(e);
        })
}

export default moviesSlice.reducer




