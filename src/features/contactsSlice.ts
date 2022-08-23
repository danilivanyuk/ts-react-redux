import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {IContact} from '../models/IContact'

interface ContactState{
    contacts: IContact
}