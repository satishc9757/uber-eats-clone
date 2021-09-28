import axios from "axios"
import { ERROR, SIGN_UP } from "../actionTypes";
import reduxStore from "../../reduxStore/store";

const custSignup = (data) => {
    axios.post("http://localhost:8000/customer/register", data)
        .then(response => {
            console.log("Response from customer register request ", response);
            reduxStore.dispatch({
                type:SIGN_UP,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error from login request ", err);
            reduxStore.dispatch({
                type:ERROR,
                payload: err
            });
        });
}

export default custSignup;