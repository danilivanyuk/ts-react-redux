import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

