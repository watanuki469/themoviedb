import axiosMovieNew from "../axiosMovieNew"

const fetchAllMovieNew = () => {
    return axiosMovieNew.get(`get-by-category`)
}

// const postCreateMovieNew = (name:any, job:any) => {
//     return axiosMovieNew.post("/api/MovieNews", {name, job})
// }

// const putUpdateMovieNew = (name:any, job:any) => {
//     return axiosMovieNew.put("/api/MovieNews", {name, job})
// }

// const deleteMovieNew = (id:any) => {
//     return axiosMovieNew.delete(`/api/MovieNews/${id}`)
// }
// const loginApi = (email:any, password:any) => {
//     return axiosMovieNew.post(`/api/login`,{email, password});
// }

export { fetchAllMovieNew }