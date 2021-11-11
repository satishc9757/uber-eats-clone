import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, LOGGED_OUT } from "../actionTypes";

export const resLogout = (data) => async dispatch => {
    console.log("Inside res login redux ");
    await axios.post(SERVER_ENDPOINT+"/res/logout", data)
    .then(response => {
        console.log("Response from logout request ", response);
        dispatch({
            type:LOGGED_OUT,
            payload: response.data
        });
    })
    .catch(err => {
        console.log("Error from logout request ", err);
        dispatch({
            type:ERROR,
            payload: err
        });
    });
}
