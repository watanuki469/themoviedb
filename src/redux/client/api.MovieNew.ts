import axiosMovieNew from "../axios/axiosMovieNew"

const fetchAllMovieNew = () => {
    return axiosMovieNew.get(`get-by-category`)
}

export { fetchAllMovieNew }