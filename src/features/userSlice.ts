import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from '../models/IUser'


interface UserState{
    user: IUser[];
    isLoading: boolean,
    error: null | string
}

const initialState: UserState = {
    user: [{id: 1, username: 'admin', password: 'admin'}],
    isLoading: false,
    error: ''
}
interface ILoginArgs{
  username: string,
  password: string
}
const getUserURL = 'http://localhost:3000/user?username='

export const getUser = createAsyncThunk(getUserURL, 
  async (arg: ILoginArgs) => {
    try {
      const resp = await axios(getUserURL + arg.username+'&password='+arg.password);
      return resp.data;
    } catch {
      console.log("something went wrong");
    }
  });

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder.addCase(getUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
      })
    }
})

export default userSlice.reducer;