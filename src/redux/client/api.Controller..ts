import axiosClient from "../axiosClient"

const apiSingleMovieRequests = {
    singleMovie(query:any) {
        const url = `movie/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },

}
const apiRequests2 = {
    singleMovie(query:any) {
        const url = `movie/${query}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`
        return axiosClient.get(url)
    },

}

export default {apiSingleMovieRequests,apiRequests2}