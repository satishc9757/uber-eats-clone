import axios from "axios";
import { ERROR, LOGGED_IN, LOGGED_OUT } from "../actionTypes";

export const resLogin = (data) => async dispatch => {
    console.log("Inside res login redux ");  
    await axios.post("http://localhost:8000/res/login", data)
    .then(response => {
        console.log("Response from login request ", response);
        //console.log("Store obj : "+reduxStore);
        dispatch({
            type:LOGGED_IN,
            payload: response.data
        });
    })
    .catch(err => {
        console.log("Error from login request ", err);
        dispatch({
            type:ERROR,
            payload: err
        });
    });
}


export const resLogout = (data) => async dispatch => {
    console.log("Res Logout Redux")
    dispatch({
        type:LOGGED_OUT,
        payload: data
    });
}

