import axios from "axios"
import reduxStore from "../../reduxStore/store";
import { ERROR, LOGGED_IN, LOGGED_OUT } from "../actionTypes";


export const resLoginAction = (data) => {
    return {
        type:LOGGED_IN,
        payload: data
    }
}

export const resLogoutAction = (data) => {
    return {
        type:LOGGED_OUT,
        payload: data
    }
}

