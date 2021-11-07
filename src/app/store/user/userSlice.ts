import {createAsyncThunk, createSelector, createSlice, isAnyOf} from '@reduxjs/toolkit';

import { RootState } from "../../store";
import {login, LoginType, register, RegisterType} from "../../apis/login";

export interface UserState {
    token: string;
    status: string;
    email: string;
    first_name: string;
    last_name: string;
}

const initialState: UserState = {
    token: '',
    status: '',
    email: '',
    first_name: '',
    last_name: '',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const asyncLogin = createAsyncThunk(
    'login',
    async (parameters: LoginType) => {
        const response = await login(parameters);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const asyncRegister = createAsyncThunk(
    'login',
    async (parameters: RegisterType) => {
        const response = await register(parameters);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.data.token;
        },
        resetToken: (state) => {
            state.token = '';
        },

        resetStatus: (state) => {
            state.status = '';
        },
    },
    extraReducers: builder => {
        builder.addMatcher(isAnyOf(asyncLogin.fulfilled, asyncRegister.fulfilled), (state, action) => {
            state.status = 'success';
            state.token = action.payload.data.token;
            state.email = action.payload.data.email;
            state.first_name = action.payload.data.first_name;
            state.last_name = action.payload.data.last_name;
            localStorage.setItem('token', state.token);
        });

        builder.addMatcher(isAnyOf (asyncLogin.rejected, asyncRegister.rejected), (state, action) => {
            state.status = 'error';
        });
    }
});

export const { setToken, resetToken, resetStatus } = userSlice.actions;

export const getLoginStatus = createSelector(
    (state: RootState) => state.user,
    user => user.status,
);

export const getToken = createSelector(
    (state: RootState) => state.user,
    user => user.token !== '' ? user.token : localStorage.getItem('token'),
);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const token = (state: RootState) => state.user.token;

export default userSlice.reducer;
