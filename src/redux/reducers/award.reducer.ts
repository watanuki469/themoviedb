import { createSlice } from '@reduxjs/toolkit';
import { ListMoviesPopular } from '../../components/models/ListMoviesPopular';
import axiosClient from '../axios/axiosClient';
import { AppDispatch } from "../store";

const language = localStorage.getItem('language')

const apiRequests = {
    oscar(page = 1) {
        const url = `list/118240?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    anime(page = 1) {
        const url = `list/146567?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    marvel(page = 1) {
        const url = `list/1?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },

    korean(page = 1) {
        const url = `list/146572?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    golden(page = 1) {
        const url = `list/43372?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    academic(page = 1) {
        const url = `list/28?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    emnysComedy(page = 1) {
        const url = `list/70091?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
        return axiosClient.get(url)
    },
    blackFilm(page = 1) {
        const url = `list/7102892?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`
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
    blackFilmList: any[]
}

const initialState: IMoviesState = {
    oscarList: [],
    animeList: [],
    marvelList: [],
    koreanList: [],
    goldenList: [],
    academicList: [],
    emnysComedyList: [],
    blackFilmList: []
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
const setListBlackFilmState = (state: IMoviesState, action: any) => {
    state.blackFilmList = action.payload
}

const appendListOscarState = (state: IMoviesState, action: any) => {
    state.oscarList = [...state.oscarList, ...action.payload];
};

const appendListAnimeState = (state: IMoviesState, action: any) => {
    state.animeList = [...state.animeList, ...action.payload];
};

const appendListMarvelState = (state: IMoviesState, action: any) => {
    state.marvelList = [...state.marvelList, ...action.payload];
};

const appendListKoreanState = (state: IMoviesState, action: any) => {
    state.koreanList = [...state.koreanList, ...action.payload];
};

const appendListGoldenState = (state: IMoviesState, action: any) => {
    state.goldenList = [...state.goldenList, ...action.payload];
};

const appendListAcademicState = (state: IMoviesState, action: any) => {
    state.academicList = [...state.academicList, ...action.payload];
};

const appendListEmnysComedyState = (state: IMoviesState, action: any) => {
    state.emnysComedyList = [...state.emnysComedyList, ...action.payload];
};

const appendListBlackFilmState = (state: IMoviesState, action: any) => {
    state.blackFilmList = [...state.blackFilmList, ...action.payload];
};



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
        setListBlackFilm: (state, action) => setListBlackFilmState(state, action),

        appendListOscar: (state, action) => appendListOscarState(state, action),
        appendListAnime: (state, action) => appendListAnimeState(state, action),
        appendListMarvel: (state, action) => appendListMarvelState(state, action),
        appendListKorean: (state, action) => appendListKoreanState(state, action),
        appendListGolden: (state, action) => appendListGoldenState(state, action),
        appendListAcademic: (state, action) => appendListAcademicState(state, action),
        appendListEmnysComedy: (state, action) => appendListEmnysComedyState(state, action),
        appendListBlackFilm: (state, action) => appendListBlackFilmState(state, action),
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
    setListBlackFilm,

    appendListOscar,
    appendListAnime,
    appendListMarvel,
    appendListKorean,
    appendListGolden,
    appendListAcademic,
    appendListEmnysComedy,
    appendListBlackFilm,

} = awardSlice.actions;

export const fetchAward = (page=1) => (dispatch: AppDispatch) => {
    Promise.all([
        apiRequests.oscar(page),
        apiRequests.anime(page),
        apiRequests.marvel(page),
        apiRequests.korean(page),
        apiRequests.golden(page),
        apiRequests.academic(page),
        apiRequests.emnysComedy(page),
        apiRequests.blackFilm(page),
    ])
        .then((data: any) => {
            if (data[0] && data[0]?.items) {
                if (page === 1) {
                    dispatch(setListOscar(data[0]?.items));
                    dispatch(setListAnime(data[1]?.items));
                    dispatch(setListMarvel(data[2]?.items));
                    dispatch(setListKorean(data[3]?.items));
                    dispatch(setListGolden(data[4]?.items));
                    dispatch(setListAcademic(data[5]?.items));
                    dispatch(setListEmnysComedy(data[6]?.items));
                    dispatch(setListBlackFilm(data[7]?.items));
                }
                else {
                    dispatch(appendListOscar(data[0].items));
                    dispatch(appendListAnime(data[1].items));
                    dispatch(appendListMarvel(data[2].items));
                    dispatch(appendListKorean(data[3].items));
                    dispatch(appendListGolden(data[4].items));
                    dispatch(appendListAcademic(data[5].items));
                    dispatch(appendListEmnysComedy(data[6].items));
                    dispatch(appendListBlackFilm(data[7].items));
                }

            } else {
                console.error("API response structure is not as expected.", data);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default awardSlice.reducer




