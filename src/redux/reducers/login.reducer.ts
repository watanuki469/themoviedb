import { createSlice } from '@reduxjs/toolkit';
import { addRecentlyViewed, fetchRecentlyViewed } from '../client/api.LoginMongo';

interface ILoginState {
    listLogin: any[],
    user: string,
    listFavorite: any[],
    register:any[],
    favorite:any[],
    listFavoriteActor:any[],
    favoriteActor:any[],
    listRecentlyView:any[],
    recentlyView:any[],
    deleteRecently:any[],
    listRating:any[],
    rating:any[],
    deleteRating:any[],
    loading:boolean,
    error:any
}

const initialState: ILoginState = {
    listLogin: [],
    user: '',
    listFavorite: [],
    register:[],
    favorite:[],
    listFavoriteActor:[],
    favoriteActor:[],
    listRecentlyView:[],
    recentlyView:[],
    deleteRecently:[],
    listRating:[],
    rating:[],
    deleteRating:[],
    loading: false,
    error: null,
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
    state.listRating = action.payload.ratingList;
}

const setDeleteRatingState = (state: ILoginState, action: any) => {
    state.deleteRecently = action.payload.recentlyViewedList;
}


export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setListLogin: (state, action) => setListLoginState(state, action),
        setUser: (state, action) => setUserState(state, action),
        setRegister:(state, action) => setRegisterState(state, action),
        setFavorite:(state, action) => setFavoriteState(state, action),
        setListFavorite:(state, action) => setListFavoriteState(state, action),
        setFavoriteActor:(state, action) => setFavoriteActorState(state, action),
        setListActorFavorite:(state, action) => setListFavoriteActorState(state, action),
        setRecentlyView:(state, action) => setRecentlyViewState(state, action),
        setListRecentlyView:(state, action) => setListRecentlyViewState(state, action),
        setDeleteRecentlyView:(state, action) => setDeleteRecentlyViewState(state, action),
        setRating:(state, action) => setRatingState(state, action),
        setListRating:(state, action) => setListRatingState(state, action),
        setDeleteRating:(state, action) => setDeleteRatingState(state, action),
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

export const { setListLogin, setUser,setRegister,setFavorite,setListFavorite,setFavoriteActor,setListActorFavorite 
    ,setListRecentlyView,setRecentlyView,setDeleteRecentlyView,setRating,setListRating,setDeleteRating
} = LoginSlice.actions;

export default LoginSlice.reducer;
