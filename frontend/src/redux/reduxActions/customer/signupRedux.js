import axios from "axios"
import reduxStore from "../../reduxStore/store";
import { ERROR, SIGN_UP } from "../actionTypes";


const custSignup = (data) => {
    axios.post("http://localhost:8000/customer/register", data)
        .then(response => {
            console.log("Response from customer register request ", response);
            reduxStore.dispatch({
                type: SIGN_UP,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error from register request ", err);
            reduxStore.dispatch({
                type:ERROR,
                payload: err
            });
        });
}

const custSignupAction = (data) => {
    return {
        type:SIGN_UP,
        payload: data
    }
}

export default custSignupAction;