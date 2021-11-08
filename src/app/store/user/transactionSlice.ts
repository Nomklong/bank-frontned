import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';

import {TransactionType} from "../../../shared/type/transaction.type";
import {TransactionGetType, transactions} from "../../apis/transaction";
import {RootState} from "../../store";
type RequestState = 'pending' | 'fulfilled' | 'rejected' | undefined;
export const transactionAdapter = createEntityAdapter<TransactionType>();

type TransactionState = {
    transaction: [],
    status: RequestState
}

const initialState: TransactionState = {
    transaction: [],
    status: undefined as RequestState
};

export const fetchTransactions = createAsyncThunk(
    'transaction',
    async (parameter: TransactionGetType ) => {
        const response = await transactions(parameter);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            // @ts-ignore
            state.transaction = action?.payload?.data;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchTransactions.pending, (state, action) => {
            state.status = 'pending';
        });
    }
});

export const getTransactions = createSelector(
    (state: RootState) => state.transaction,
    transaction => transaction.transaction,
);

export const getTransactionStatus = createSelector(
    (state: RootState) => state.transaction,
    transaction => transaction.status,
);

export default userSlice.reducer;
