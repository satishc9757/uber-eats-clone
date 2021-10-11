import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, LOGGED_IN, LOGGED_OUT } from "../actionTypes";

export const custLogin = (data) => async dispatch => {
    console.log("Inside cust login redux ");  
    await axios.post(SERVER_ENDPOINT+"/customer/login", data)
    .then(response => {
        console.log("Response from login request ", response);
        
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

export const custLogout = (data) => async dispatch =>  {
    dispatch({
        type:LOGGED_OUT,
        payload: data
    });
}

