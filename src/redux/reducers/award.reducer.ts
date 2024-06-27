import { createSlice } from '@reduxjs/toolkit';
import { ListMoviesPopular } from '../../components/models/ListMoviesPopular';
import axiosClient from '../axios/axiosClient';
import { AppDispatch } from "../store";
const language = localStorage.getItem('language')
const apiRequests = {
    oscar() {
        const url = `list/118240?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    anime() {
        const url = `list/146567?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    marvel() {
        const url = `list/1?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },

    korean() {
        const url = `list/146572?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    golden() {
        const url = `list/43372?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    academic() {
        const url = `list/28?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
    emnysComedy() {
        const url = `list/70091?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },

}

interface IMoviesState {
    oscarList: any[],
    animeList: any[],
    marvelList: any[],
    koreanList: any[],
    goldenList: any[],
    academicList: any[],
    emnysComedyList: any[],
}

const initialState: IMoviesState = {
    oscarList: [],
    animeList: [],
    marvelList: [],
    koreanList: [],
    goldenList: [],
    academicList: [],
    emnysComedyList: [],
}

const setListOscarState = (state: IMoviesState, action: any) => {
    state.oscarList = action.payload
}

const setListAnimeState = (state: IMoviesState, action: any) => {
    state.animeList = action.payload
}

const setListMarvelState = (state: IMoviesState, action: any) => {
    state.marvelList = action.payload
}

const setListKoreanState = (state: IMoviesState, action: any) => {
    state.koreanList = action.payload
}

const setListGoldenState = (state: IMoviesState, action: any) => {
    state.goldenList = action.payload
}

const setListAcademicState = (state: IMoviesState, action: any) => {
    state.academicList = action.payload
}

const setListEmnysComedyState = (state: IMoviesState, action: any) => {
    state.emnysComedyList = action.payload
}

export const awardSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setListOscar: (state, action) => setListOscarState(state, action),
        setListAnime: (state, action) => setListAnimeState(state, action),
        setListMarvel: (state, action) => setListMarvelState(state, action),
        setListKorean: (state, action) => setListKoreanState(state, action),
        setListGolden: (state, action) => setListGoldenState(state, action),
        setListAcademic: (state, action) => setListAcademicState(state, action),
        setListEmnysComedy: (state, action) => setListEmnysComedyState(state, action),
    }
})

export const {
    setListOscar,
    setListAnime,
    setListMarvel,
    setListKorean,
    setListGolden,
    setListAcademic,
    setListEmnysComedy,
} = awardSlice.actions;

export const fetchAward = () => (dispatch: AppDispatch) => {
    Promise.all([
        apiRequests.oscar(),
        apiRequests.anime(),
        apiRequests.marvel(),
        apiRequests.korean(),
        apiRequests.golden(),
        apiRequests.academic(),
        apiRequests.emnysComedy(),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.items ) {
                dispatch(setListOscar(data[0]?.items));
                dispatch(setListAnime(data[1]?.items));
                dispatch(setListMarvel(data[2]?.items));
                dispatch(setListKorean(data[3]?.items));
                dispatch(setListGolden(data[4]?.items));
                dispatch(setListAcademic(data[5]?.items));
                dispatch(setListEmnysComedy(data[6]?.items));
            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default awardSlice.reducer




