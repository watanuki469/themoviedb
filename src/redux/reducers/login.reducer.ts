import { createSlice } from '@reduxjs/toolkit';

interface ILoginState {
    listLogin: any[],
    user: string,
    listFavorite: any[],
    register:any[],
    favorite:any[],
}

const initialState: ILoginState = {
    listLogin: [],
    user: '',
    listFavorite: [],
    register:[],
    favorite:[],
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

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setListLogin: (state, action) => setListLoginState(state, action),
        setUser: (state, action) => setUserState(state, action),
        setRegister:(state, action) => setRegisterState(state, action),
        setFavorite:(state, action) => setFavoriteState(state, action),
        setListFavorite:(state, action) => setListFavoriteState(state, action),
    }
});

export const { setListLogin, setUser,setRegister,setFavorite,setListFavorite } = LoginSlice.actions;

export default LoginSlice.reducer;
