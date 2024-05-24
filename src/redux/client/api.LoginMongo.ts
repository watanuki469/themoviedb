import axiosMongo from "../axios/axiosUserMongo"

const fetchAllMongoUser = (page: any) => {
    return axiosMongo.get(`/api/users?page=${page}`)
}

const registerMongoApi = (displayName: any, email: any, password: any, confirmPassword: any) => {
    return axiosMongo.post("/api/user/signup", { displayName, email, password, confirmPassword })
}

const updateMongoPasswordApi = (email: any, password: any, newPassword: any, confirmNewPassword: any) => {
    return axiosMongo.put("/api/users", { email, password, newPassword, confirmNewPassword })
}

const deleteMongoUser = (id: any) => {
    return axiosMongo.delete(`/api/users/${id}`)
}
const loginMongoApi = (email: any, password: any) => {
    return axiosMongo.post(`/api/user/signin`, { email, password },
        {
            withCredentials: true,
        });
}

const favoriteMongoApi = (email: string, movieId: string, mediaType: string, movieName: string,  movieImg: string, movieReleaseDay: Date, movieGenre: number[], movieReview: string, moviePopularity: string, movieVoteAverage: string, movieVoteCount: string) => {
    return axiosMongo.post(`/api/user/addFavorite`, {
        email,
        movieId,
        mediaType,
        movieName,
        movieImg,
        movieReleaseDay,
        movieGenre,
        movieReview,
        moviePopularity,
        movieVoteAverage,
        movieVoteCount
    });
};
const getFavoriteMongoApi = (email: any) => {
    return axiosMongo.get(`/api/user/getFavorite`, {
        params: {
            email: email
        }
    });
}
const favoriteActorMongoApi = (email: string, movieId: string,  movieName: string,  movieImg: string, movieReleaseDay: Date, movieReview: string, moviePopularity: string, movieKnowFor: string) => {
    return axiosMongo.post(`/api/user/addFavoriteActor`, {
        email,
        movieId,
        movieName,
        movieImg,
        movieReleaseDay,
        movieReview,
        moviePopularity,
        movieKnowFor,
    });
};
const getFavoriteActorMongoApi = (email: any) => {
    return axiosMongo.get(`/api/user/getFavoriteActor`, {
        params: {
            email: email
        }
    });
}

const recentlyViewMongoApi = (email: string, movieId: string,  movieName: string,  movieImg: string, movieType:string) => {
    return axiosMongo.post(`/api/user/addRecentlyViewed`, {
        email,
        movieId,
        movieName,
        movieImg,
        movieType
    });
};
const getListRecentlyViewMongoApi = (email: any) => {
    return axiosMongo.get(`/api/user/getRecentlyViewed`, {
        params: {
            email: email
        }
    });
}


export { fetchAllMongoUser, registerMongoApi, updateMongoPasswordApi, deleteMongoUser, loginMongoApi,
     favoriteMongoApi, getFavoriteMongoApi ,favoriteActorMongoApi,getFavoriteActorMongoApi
    ,recentlyViewMongoApi,getListRecentlyViewMongoApi}