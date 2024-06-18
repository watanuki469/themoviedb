import axiosFilm from "../axios/axiosFilm";

const fetchSingleFilm = {
    singleFilm(slug:any) {
        const url = `phim/${slug}`;
        return axiosFilm.get(url)
    },
}
const getAllFilm = {
    allFilm(page:any) {
        const url = `danh-sach/phim-moi-cap-nhat?page=${page}`
        return axiosFilm.get(url)
    },
}

export default { fetchSingleFilm, getAllFilm };