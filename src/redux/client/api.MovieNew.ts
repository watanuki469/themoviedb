import axiosMovieNew from "../axiosMovieNew"

const fetchAllMovieNew = () => {
    return axiosMovieNew.get(`get-by-category`)
}

export { fetchAllMovieNew }