import { createSlice } from '@reduxjs/toolkit';

interface ILoginState {
    listLogin: any[],
    user: string,
    listFavorite: any[],
    register:any[]
}

const initialState: ILoginState = {
    listLogin: [],
    user: '',
    listFavorite: [],
    register:[]
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

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setListLogin: (state, action) => setListLoginState(state, action),
        setUser: (state, action) => setUserState(state, action),
        setRegister:(state, action) => setRegisterState(state, action),
    }
});

export const { setListLogin, setUser,setRegister } = LoginSlice.actions;

export default LoginSlice.reducer;
