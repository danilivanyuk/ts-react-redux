import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import contactsReducer from './features/contactsSlice';
import userReducer from './features/userSlice'
import type { TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
  reducer: {
    userReducer,
    contactsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

