import {createSlice} from "@reduxjs/toolkit";


export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: {
        user: null
    },
    reducers: {
        login : (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    }
});

export const {login, logout} = loginUserSlice.actions;

