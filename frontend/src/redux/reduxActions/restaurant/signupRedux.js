import axios from "axios";
import { ERROR, SIGN_UP } from "../actionTypes";


export const resSignup = (data) => async dispatch => {
    axios.post("http://localhost:8000/res/register", data)
        .then(response => {
            console.log("Response from register request ", response);
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

export default resSignup;