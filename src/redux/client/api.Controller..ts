import axiosClient from "../axiosClient"

const apiSingleMovieRequests = {
    singleMovie(query: any) {
        const url = `movie/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&include_adult=false&append_to_response=videos,images,reviews,release_dates,reviews,credits,similar,keywords&include_image_language=null,en`
        return axiosClient.get(url)
    },
}

const apiMovieVideo = {
    movieVideo(query: any) {
        const url = `movie/${query}/videos?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`
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
        const url = `movie/${query}/credits?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },
}

const apiMovieSimilar = {
    movieSimilar(query: any) {
        const url = `movie/${query}/similar?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`
        return axiosClient.get(url)
    },
}

const apiPerson = {
    person(query: any) {
        const url = `person/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&append_to_response=combined_credits%2Cexternal_ids%2Cimages&language=en-US`
        return axiosClient.get(url)
    },
}
const apiSearch = {
    search(mediaType:any,query: any) {
        const url = `search/${mediaType}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&query=${query}&include_adult=true&language=en-US&page=1`;
        return axiosClient.get(url)
    },
}

export default { apiSingleMovieRequests, apiMovieVideo, apiMovieImage, apiMovieCredits ,apiMovieSimilar,apiPerson,apiSearch}