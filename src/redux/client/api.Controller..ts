import axiosClient from "../axios/axiosClient"

const language = localStorage.getItem('language')

const apiSingleMovieRequests = {
    singleMovie(query: any) {
        const url = `movie/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&include_adult=false&append_to_response=videos,images,reviews,release_dates,reviews,credits,similar,keywords&include_image_language=null,en`
        return axiosClient.get(url)
    },
}

const apiMovieVideo = {
    movieVideo(query: any) {
        const url = `movie/${query}/videos?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
}

const apiMovieImage = {
    movieImage(query: any) {
        const url = `movie/${query}/images?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`
        return axiosClient.get(url)
    },
}

//get actor
const apiMovieCredits = {
    movieCredit(query: any) {
        const url = `movie/${query}/credits?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
}

const apiMovieSimilar = {
    movieSimilar(query: any) {
        const url = `movie/${query}/similar?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`
        return axiosClient.get(url)
    },
}

const apiPerson = {
    person(query: any) {
        const url = `person/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&append_to_response=combined_credits%2Cexternal_ids%2Cimages&language=${language}`
        return axiosClient.get(url)
    },
}
const apiSearch = {
    search(mediaType: any, query: any, page = 1) {
        const url = `search/${mediaType}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&query=${query}&include_adult=false&language=${language}&page=${page}`;
        return axiosClient.get(url)
    },
}

const apiTv = {
    tv(query: any) {
        const url = `tv/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&append_to_response=account_states%2Caggregate_credits%2Calternative_titles%2Ccredits%2Cepisode_groups%2Cexternal_ids%2Cimages%2Ckeywords%2Crecommendations%2Creviews%2Cscreened_theatrically%2Ccontent_ratings%2Csimilar%2Cvideos&language=${language}`;
        return axiosClient.get(url)
    },
}
const apiTvImages = {
    tvImage(query: any) {
        const url = `tv/${query}/images?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`;
        return axiosClient.get(url)
    },
}

// const apiUpComing = {
//     upComing(mediaType: any) {
//         const url = `${mediaType}/upcoming?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=1`;
//         return axiosClient.get(url)
//     },
// }
// --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=20&primary_release_year=2024&primary_release_date.gte=2024-06-28&release_date.lte=2024-06-28&sort_by=primary_release_date.asc' \
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const apiUpComing = {
    upComing(mediaType: any, page = 1) {
        const todayDate = getTodayDate();
        const url = mediaType === 'movie'
            ? `/discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&include_adult=false&include_video=false&language=${language}&page=${page}&primary_release_date.gte=${todayDate}&release_date.gte=${todayDate}&sort_by=primary_release_date.asc`
            : `/discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&include_adult=false&include_video=false&language=${language}&page=${page}&first_air_date.gte=${todayDate}&include_null_first_air_dates=false&sort_by=first_air_date.asc`;
        return axiosClient.get(url);
    }
};

const apiPeoplePopular = {
    peoplePopular(page = 1) {
        const url = `person/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&page=${page}`;
        return axiosClient.get(url)
    },
}
const apiKeyword = {
    keyword(query: any, mediaType: any, page = 1) {
        if (mediaType == 'movie') {
            const url = `discover/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_keywords=${query}`
            return axiosClient.get(url)
        }
        else {
            const url = `discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_null_first_air_dates&include_adult=false&page=${page}&with_keywords=${query}`
            return axiosClient.get(url)
        }
    },
}

const apiNetwork = {
    network(query: any, page = 1) {
        const url = `discover/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}&sort_by=popularity.desc&include_null_first_air_dates&include_adult=false&page=${page}&with_networks=${query}`
        return axiosClient.get(url)
    },
}

const apiGenre = {
    genre(mediaType: any) {
        const url = `genre/${mediaType}/list?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=${language}`;
        return axiosClient.get(url)
    },
}
export default {
    apiSingleMovieRequests, apiMovieVideo, apiMovieImage, apiMovieCredits,
    apiMovieSimilar, apiPerson, apiSearch, apiTv, apiTvImages, apiUpComing, apiPeoplePopular, apiKeyword, apiGenre, apiNetwork
}