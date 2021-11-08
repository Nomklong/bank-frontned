import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../app/store/user/userSlice';
import walletReducer from '../app/store/user/walletSlice';
import transactionReducer from '../app/store/user/transactionSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
