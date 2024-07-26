import { createSlice } from '@reduxjs/toolkit';
import { addDislikeToReviewMongoMovieApi, addLikeToReviewMongoMovieApi, addRecentlyViewed, favoriteActorMongoApi, favoriteMongoApi, fetchRecentlyViewed, getFavoriteActorMongoApi, getFavoriteMongoApi, getFullReviewMongoMovieApi, getListRatingMongoApi, getListRecentlyViewMongoApi, ratingMongoApi, remoReviewMongoMovieApi, removeListRecentlyViewMongoApi, removeRatingMongoApi, reviewMongoMovieApi } from '../client/api.LoginMongo';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';

interface ILoginState {
    listLogin: any[],
    user: string,
    listFavorite: any[],
    register: any[],
    favorite: any[],
    listFavoriteActor: any[],
    favoriteActor: any[],
    listRecentlyView: any[],
    recentlyView: any[],
    deleteRecently: any[],
    listRating: any[],
    rating: any[],
    deleteRating: any[],
    loading: boolean,
    error: any,
    review: any[],
    singleUserReview: any[],
    fullMovieReview: any[],
    addLiketoReview: any[]
}

const initialState: ILoginState = {
    listLogin: [],
    user: '',
    listFavorite: [],
    register: [],
    favorite: [],
    listFavoriteActor: [],
    favoriteActor: [],
    listRecentlyView: [],
    recentlyView: [],
    deleteRecently: [],
    listRating: [],
    rating: [],
    deleteRating: [],
    loading: false,
    error: null,
    review: [],
    singleUserReview: [],
    fullMovieReview: [],
    addLiketoReview: []
}

const setListLoginState = (state: ILoginState, action: any) => {
    state.listLogin = action.payload;
}

const setUserState = (state: ILoginState, action: any) => {
    state.user = action.payload[0].displayName;
}

const setRegisterState = (state: ILoginState, action: any) => {
    state.register = action.payload.email;
}
const setFavoriteState = (state: ILoginState, action: any) => {
    state.favorite = action.payload;
}
const setListFavoriteState = (state: ILoginState, action: any) => {
    state.listFavorite = action.payload?.favorites;
}

const setFavoriteActorState = (state: ILoginState, action: any) => {
    state.favoriteActor = action.payload;
}
const setListFavoriteActorState = (state: ILoginState, action: any) => {
    state.listFavoriteActor = action.payload.favoritesActor;
}

const setRecentlyViewState = (state: ILoginState, action: any) => {
    state.recentlyView = action.payload;
}
const setListRecentlyViewState = (state: ILoginState, action: any) => {
    state.listRecentlyView = action.payload.recentlyViewedList;
}
const setDeleteRecentlyViewState = (state: ILoginState, action: any) => {
    state.deleteRecently = action.payload.recentlyViewedList;
}
const setRatingState = (state: ILoginState, action: any) => {
    state.rating = action.payload;
}
const setListRatingState = (state: ILoginState, action: any) => {
    state.listRating = action.payload;
}

const setDeleteRatingState = (state: ILoginState, action: any) => {
    state.deleteRecently = action.payload.recentlyViewedList;
}
const setReviewState = (state: ILoginState, action: any) => {
    state.review = action.payload;
}

const setListSingleUserReviewState = (state: ILoginState, action: any) => {
    state.singleUserReview = action.payload.userReview;
}

const setListFullMovieReviewState = (state: ILoginState, action: any) => {
    state.fullMovieReview = action.payload.review.reviews;
}

const setListAddLikeToReviewState = (state: ILoginState, action: any) => {
    state.addLiketoReview = action.payload;
}


export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setListLogin: (state, action) => setListLoginState(state, action),
        setUser: (state, action) => setUserState(state, action),
        setRegister: (state, action) => setRegisterState(state, action),
        setFavorite: (state, action) => setFavoriteState(state, action),
        setListFavorite: (state, action) => setListFavoriteState(state, action),
        setFavoriteActor: (state, action) => setFavoriteActorState(state, action),
        setListActorFavorite: (state, action) => setListFavoriteActorState(state, action),
        setRecentlyView: (state, action) => setRecentlyViewState(state, action),
        setListRecentlyView: (state, action) => setListRecentlyViewState(state, action),
        setDeleteRecentlyView: (state, action) => setDeleteRecentlyViewState(state, action),
        setRating: (state, action) => setRatingState(state, action),
        setListRating: (state, action) => setListRatingState(state, action),
        setDeleteRating: (state, action) => setDeleteRatingState(state, action),
        setReview: (state, action) => setReviewState(state, action),
        setListSingleUserReview: (state, action) => setListSingleUserReviewState(state, action),
        setListFullMovieReview: (state, action) => setListFullMovieReviewState(state, action),
        setListAddLikeToReview: (state, action) => setListAddLikeToReviewState(state, action)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentlyViewed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
                state.loading = false;
                state.listRecentlyView = action.payload;
            })
            .addCase(fetchRecentlyViewed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addRecentlyViewed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecentlyViewed.fulfilled, (state, action) => {
                state.loading = false;
                state.recentlyView = action.payload;
            })
            .addCase(addRecentlyViewed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setListLogin, setUser, setRegister, setFavorite, setListFavorite, setFavoriteActor, setListActorFavorite
    , setListRecentlyView, setRecentlyView, setDeleteRecentlyView, setRating, setListRating, setDeleteRating, setReview,
    setListSingleUserReview, setListFullMovieReview, setListAddLikeToReview
} = LoginSlice.actions;

// list fetch
// get favorite
export const fetchGetFavorites = (email: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await getFavoriteMongoApi(email);
        if (response) {
            dispatch(setListFavorite(response));
        } else {
            throw new Error('Failed to fetch favorites');
        }
    } catch (e) {
        console.log("Fetching favorites failed: " + e);
    }
}
// post favorite
export const fetchFavorite = (
    email: string,
    movieId: string,
    movieType: string,
    movieName: string,
    movieImg: string,
    movieReleaseDay: Date,
    movieGenre: number[],
    movieReview: string,
    moviePopularity: string,
    movieVoteAverage: string,
    movieVoteCount: string
) => async (dispatch: AppDispatch) => {
    try {
        const response = await favoriteMongoApi(
            email, movieId, movieType === 'movie' ? 'Movie' : 'TV', movieName, movieImg, movieReleaseDay, movieGenre, movieReview, moviePopularity, movieVoteAverage, movieVoteCount
        );
        dispatch(setFavorite(response));
        if (response) {
            await dispatch(fetchGetFavorites(email));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Updating watch list failed");
    }
};
// get actor favorite
export const fetchGetFavoritesActor = (email: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await getFavoriteActorMongoApi(email);
        if (response) {
            dispatch(setListActorFavorite(response));
        } else {
            throw new Error('Failed to fetch favorites actor list');
        }
    } catch (e) {
        console.log("Fetching favorites actor failed: " + e);
    }
}

//post actor favorite
export const fetchFavoriteActor = (
    email: string,
    movieId: string,
    movieName: string,
    movieImg: string,
    movieReleaseDay: Date,
    movieReview: string,
    moviePopularity: string,
    movieKnowFor: string,
) => async (dispatch: AppDispatch) => {
    try {
        const response = await favoriteActorMongoApi(
            email, movieId, movieName, movieImg, movieReleaseDay, movieReview, moviePopularity, movieKnowFor
        );
        dispatch(setFavoriteActor(response));
        if (response) {
            await dispatch(fetchGetFavoritesActor(email));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Updating watch list failed");
    }
};

//get Recently view
export const fetchGetRecentlyView = (email: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await getListRecentlyViewMongoApi(email);
        if (response) {
            dispatch(setListRecentlyView(response));
        } else {
            throw new Error('Failed to fetch recently list');
        }
    } catch (e) {
        console.log("Fetching recently list failed: " + e);
    }
}

// remove 1 Recently View
export const fetchRemoveRecentlyView = (
    email: string,
    movieId: string,
    movieType: string,
    removeALl: string
) => async (dispatch: AppDispatch) => {
    try {
        const response = await removeListRecentlyViewMongoApi(   email, movieId, movieType, removeALl);
        dispatch(setDeleteRecentlyView(response));
        if (response) {
            await dispatch(fetchGetRecentlyView(email));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Updating watch list failed");
    }
};

//get rating
export const fetchGetRating = (mediaType: any, userInfoList: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await getListRatingMongoApi(mediaType, userInfoList);
        if (response) {
            dispatch(setListRating(response));
        } else {
            throw new Error('Failed to fetch list');
        }
    } catch (e) {
        console.log("Fetching list failed: " + e);
    }
};

//remove rating
export  const fetchRemoveRating = (email:any,mediaType:any,itemId: any, reviewId: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await removeRatingMongoApi(mediaType, itemId, reviewId);
        if (response) {
            await dispatch(fetchGetRating(mediaType, email));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating failed: " + e);
        toast.error("Remove rating failed due to " + e);
    }
};

//post rating
export const fetchRating = (
    mediaType:string,
    itemId: string,
    itemName: any,
    itemTMDbRating: string,
    itemTMDbRatingCount: string,
    itemTMDbReleaseDay: string,
    itemTMDbRunTime: string,
    itemImg: string,
    itemEmail: string,
    itemDisplayName: any,
    itemRating: string,
) => async (dispatch: AppDispatch) => {
    try {
        const response = await ratingMongoApi(
            mediaType, itemId, itemName, itemTMDbRating, itemTMDbRatingCount, itemTMDbReleaseDay, itemTMDbRunTime, itemImg, itemEmail, itemDisplayName, itemRating
        );
        dispatch(setRating(response));
        if (response) {
            await dispatch(fetchGetRating(mediaType,itemEmail));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Updating watch list failed");
    }
};

// get full mediaType review
export const fetchGetAllMovieReview = (mediaType:any,id:any) => async (dispatch: AppDispatch) => {
    try {
        const response = await getFullReviewMongoMovieApi(mediaType, id);
        if (response) {
            dispatch(setListFullMovieReview(response));
        } else {
            throw new Error('Failed to fetch list');
        }
    } catch (e) {
        console.log("Fetching fetchGetAllMovieReview failed: " + e);
    }
}

// fetch add discuss
export const fetchDiscuss = (
    mediaType:any,
    itemId: string,
    itemName: string,
    itemTMDbRating:string,
    itemTMDbRatingCount:string,
    itemTMDbReleaseDay:string,
    itemTMDbRunTime:string,
    itemImg: string,
    itemEmail: string,
    itemDisplayName: string,
    itemContent: string,
) => async (dispatch: AppDispatch) => {
    try {
        const response = await reviewMongoMovieApi(
            mediaType, itemId, itemName, itemTMDbRating,
            itemTMDbRatingCount,
            itemTMDbReleaseDay,
            itemTMDbRunTime, itemImg, itemEmail, itemDisplayName, itemContent
        );
        dispatch(setReview(response));
        if (response) {
            await dispatch(fetchGetAllMovieReview(mediaType,itemId));
           
        } else {
            toast.error('Something went wrong');
           
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Updating watch list failed");
       
    }
};


// fetch add dislike to review
export const fetchAddDislike = (
    mediaType:any,
    itemId: string,
    reviewId: string,
    itemEmail: string,
    itemDisplayName: string,
) => async (dispatch: AppDispatch) => {
    try {
        const response = await addDislikeToReviewMongoMovieApi(
            mediaType,itemId, reviewId, itemEmail, itemDisplayName
        );
        if (response) {
            await dispatch(fetchGetAllMovieReview(mediaType,itemId));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating failed: " + e);
        toast.error("Something went wrong");
    }
};
// remove review/discus
export const fetchRemoveReview = (
    mediaType:any,
    itemId: string,
    reviewId: string
) => async (dispatch: AppDispatch) => {
    try {
        const response = await remoReviewMongoMovieApi(
            mediaType, itemId, reviewId
        );
        if (response) {
            await dispatch(fetchGetAllMovieReview(mediaType,itemId));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating watch list failed: " + e);
        toast.error("Something went wrong");
    }
};

//fetch add like to review
export const fetchAddlike = (
    mediaType:any,
    itemId: string,
    reviewId: string,
    itemEmail: string,
    itemDisplayName: string,
) => async (dispatch: AppDispatch) => {
    try {
        const response = await addLikeToReviewMongoMovieApi(
            mediaType,itemId, reviewId, itemEmail, itemDisplayName
        );
        if (response) {
            await dispatch(fetchGetAllMovieReview(mediaType,itemId));
        } else {
            toast.error('Something went wrong');
        }
    } catch (e) {
        console.log("Updating failed: " + e);
        toast.error("Something went wrong");
    }
};


export default LoginSlice.reducer;
