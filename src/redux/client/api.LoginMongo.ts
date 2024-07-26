import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosMongo from "../axios/axiosUserMongo"

const fetchAllMongoUser = (page: any) => {
    return axiosMongo.get(`/api/users?page=${page}`)
}

const registerMongoApi = (displayName: any, email: any, password: any, confirmPassword: any) => {
    return axiosMongo.post("/api/user/signup", { displayName, email, password, confirmPassword })
}

const updateMongoPasswordApi = (email: any, password: any, newPassword: any, confirmNewPassword: any) => {
    return axiosMongo.post("/api/user/updatePassword", { email, password, newPassword, confirmNewPassword })
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

const favoriteMongoApi = (email: string, movieId: string, mediaType: string, movieName: string, movieImg: string, movieReleaseDay: Date, movieGenre: number[], movieReview: string, moviePopularity: string, movieVoteAverage: string, movieVoteCount: string) => {
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
const favoriteActorMongoApi = (email: string, movieId: string, movieName: string, movieImg: string, movieReleaseDay: Date, movieReview: string, moviePopularity: string, movieKnowFor: string) => {
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

const recentlyViewMongoApi = (email: string, movieId: string, movieName: string, movieImg: string, movieType: string) => {
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
export const fetchRecentlyViewed = createAsyncThunk(
    'login/fetchRecentlyViewed',
    async (email, thunkAPI) => {
        const response = await getListRecentlyViewMongoApi(email);
        return response.data;
    }
);

export const addRecentlyViewed = createAsyncThunk(
    'login/addRecentlyViewed',
    async ({ email, movieId, movieName, movieImg, movieType }: any, thunkAPI) => {
        const response = await recentlyViewMongoApi(email, movieId, movieName, movieImg, movieType);
        return response.data;
    }
);

const removeListRecentlyViewMongoApi = (email: any, movieId: any, movieType: any, removeAll: any) => {
    return axiosMongo.post(`/api/user/removeRecentlyViewed`, {
        email: email,
        movieId: movieId,
        movieType: movieType,
        removeAll: removeAll
    });
}

const ratingMongoApi = (mediaType: any, itemId: any, itemName: any, itemTMDbRating: string, itemTMDbRatingCount: string, itemTMDbReleaseDay: string, itemTMDbRunTime: string, itemImg: string, itemEmail: string, itemDisplayName: string, itemRating: any) => {
    return axiosMongo.post(`/api/${mediaType}/addRating`, {
        itemId,
        itemName,
        itemTMDbRating,
        itemTMDbRatingCount,
        itemTMDbReleaseDay,
        itemTMDbRunTime,
        itemImg,
        itemEmail,
        itemDisplayName,
        itemRating
    });
};

const getListRatingMongoApi = (mediaType: any, itemEmail: any) => {
    return axiosMongo.get(`/api/${mediaType}/getFullRating?itemEmail=${itemEmail}`);
}

const removeRatingMongoApi = (mediaType: any, itemId: any, ratingId: any) => {
    return axiosMongo.post(`/api/${mediaType}/removeRating`, {
        itemId,
        ratingId,
    });
}

const reviewMongoMovieApi = (mediaType: any, itemId: any, itemName: string, itemTMDbRating: string, itemTMDbRatingCount: string, itemTMDbReleaseDay: string, itemTMDbRunTime: string, itemImg: string, itemEmail: string, itemDisplayName: string, itemContent: string) => {
    return axiosMongo.post(`/api/${mediaType}/addReview`, {
        itemId, itemName, itemTMDbRating, itemTMDbRatingCount, itemTMDbReleaseDay, itemTMDbRunTime, itemImg, itemEmail, itemDisplayName, itemContent,
    });
};

const getUserReviewMongoMovieApi = (mediaType: any, itemId: any, itemEmail: string) => {
    return axiosMongo.get(`/api/${mediaType}/getUserReview`, {
        params: {
            itemId: itemId,
            itemEmail: itemEmail,
        }
    });
};

const getFullReviewMongoMovieApi = (mediaType: any, itemId: any) => {
    return axiosMongo.get(`/api/${mediaType}/getFullReview`, {
        params: {
            itemId: itemId,
        }
    });
};

const addLikeToReviewMongoMovieApi = (mediaType: any, itemId: any, reviewId: string, itemEmail: string, itemDisplayName: string) => {
    return axiosMongo.post(`/api/${mediaType}/addReviewLike`, {
        itemId,
        reviewId,
        itemEmail,
        itemDisplayName
    });
};

const addDislikeToReviewMongoMovieApi = (mediaType: any, itemId: any, reviewId: string, itemEmail: string, itemDisplayName: string) => {
    return axiosMongo.post(`/api/${mediaType}/addReviewDislike`, {
        itemId,
        reviewId,
        itemEmail,
        itemDisplayName
    });
};

const remoReviewMongoMovieApi = (mediaType: any, itemId: any, reviewId: string) => {
    return axiosMongo.post(`/api/${mediaType}/removeUserReview`, {
        itemId,
        reviewId,
    });
};

export {
    fetchAllMongoUser, registerMongoApi, updateMongoPasswordApi, deleteMongoUser, loginMongoApi,
    favoriteMongoApi, getFavoriteMongoApi, favoriteActorMongoApi, getFavoriteActorMongoApi
    , recentlyViewMongoApi, getListRecentlyViewMongoApi, removeListRecentlyViewMongoApi,
    ratingMongoApi, getListRatingMongoApi, removeRatingMongoApi, reviewMongoMovieApi,
    getUserReviewMongoMovieApi, getFullReviewMongoMovieApi, addLikeToReviewMongoMovieApi, remoReviewMongoMovieApi,
    addDislikeToReviewMongoMovieApi
}