import { createSlice } from '@reduxjs/toolkit';

interface ILoginState {
    listLogin: any[],
    user: string,
    listFavorite: any[],
    register:any[],
    favorite:any[],
    listFavoriteActor:any[],
    favoriteActor:any[],
    listRecentlyView:any[],
    recentlyView:any[]
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
}

const setListLoginState = (state: ILoginState, action: any) => {
    state.listLogin = action.payload;
}

const setUserState = (state: ILoginState, action: any) => {
    state.user = action.payload[0].displayName;
}

const setRegisterState = (state: ILoginState, action: any) => {
    state.register = action.payload;
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
    state.listRecentlyView = action.payload.recentlyViewed;
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
    }
});

export const { setListLogin, setUser,setRegister,setFavorite,setListFavorite,setFavoriteActor,setListActorFavorite 
    ,setListRecentlyView,setRecentlyView
} = LoginSlice.actions;

export default LoginSlice.reducer;
