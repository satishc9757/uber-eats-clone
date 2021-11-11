import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, LOGGED_OUT } from "../actionTypes";

export const custLogout = (data) => async dispatch => {
    console.log("Inside cust logout redux ");
    axios.defaults.withCredentials = true;
    await axios.post(SERVER_ENDPOINT+"/customer/logout", data)
    .then(response => {
        console.log("Response from login request ", response);

        dispatch({
            type:LOGGED_OUT,
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