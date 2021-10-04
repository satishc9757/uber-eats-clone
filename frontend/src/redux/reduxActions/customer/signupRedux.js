import axios from "axios";
import { ERROR, SIGN_UP } from "../actionTypes";


export const custSignup = (data) => async dispatch => {
    axios.post("http://localhost:8000/customer/register", data)
        .then(response => {
            console.log("Response from customer register request ", response);
            dispatch({
                type: SIGN_UP,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error from register request ", err);
            dispatch({
                type:ERROR,
                payload: err
            });
        });
}

