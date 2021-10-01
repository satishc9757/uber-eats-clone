import axios from "axios"
import reduxStore from "../../reduxStore/store";
import { ERROR, SIGN_UP } from "../actionTypes";



const resSignupAction = (data) => {
    return {
        type:SIGN_UP,
        payload: data
    }
}

export default resSignupAction;