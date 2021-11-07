import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { RootState } from "../../store";
import {checkBalance} from "../../apis/wallet";

export interface UserState {
    balance: number;
    wallet_number: number | null;
}

const initialState: UserState = {
    balance: 0,
    wallet_number: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const asyncCheckBalance = createAsyncThunk(
    'check-balance',
    async () => {
        const response = await checkBalance();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.balance = action.payload.data.balance;
        },
    },
    extraReducers: builder => {
        builder.addCase(asyncCheckBalance.fulfilled, (state, action) => {
            state.wallet_number = action.payload.data.wallet_number ?? null;
            state.balance = action.payload.data.balance;
        });
    }
});

export const { setBalance } = userSlice.actions;

export const getBalance = (state: RootState) => state.wallet.balance;

export default userSlice.reducer;
