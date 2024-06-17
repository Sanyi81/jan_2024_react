import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/userInterface";

interface IState {
    me: IUser,
    error: boolean
}

let initialState: IState = {
    me: null,
    error: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions
}

export {
    authActions,
    authReducer
}