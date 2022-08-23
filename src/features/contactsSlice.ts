import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IContact} from '../models/IContact'

interface ContactState{
    contacts: IContact[];
    isLoading:boolean,
    error: null | string
}

const initialState: ContactState ={
    contacts:[],
    isLoading: false,
    error: ''
}

const getUserContactsUrl = 'http://localhost:3000/contacts?userId='
export const getUserContacts = createAsyncThunk(getUserContactsUrl, async(userId:number) => {
    try {
        const resp = await axios(getUserContactsUrl + userId);
        return resp.data;
      } catch {
        console.log("something went wrong");
      }
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        deleteContact(state, action: PayloadAction<number>){
            state.contacts = state.contacts.filter(obj => {
                return obj.id !== action.payload;
              });
        },
        addContact(state, action: PayloadAction<any>){
            state.contacts.push(action.payload)
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserContacts.pending, (state)=>{
            state.isLoading = true;
        }),
        builder.addCase(getUserContacts.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.contacts = action.payload;
        })
        builder.addCase(getUserContacts.rejected, (state)=>{
            state.isLoading = false;
        })
    }
})

export const { deleteContact, addContact } = contactsSlice.actions
export default contactsSlice.reducer;