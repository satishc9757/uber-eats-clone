import axios from "axios"
import { ERROR, LOGGED_IN } from "./actionTypes";
import reduxStore from "../reduxStore/store";

export const custLogin = (data) => {
    axios.post("http://localhost:8000/customer/login", data)
        .then(response => {
            console.log("Response from login request ", response);
            console.log("Store obj : "+reduxStore);
            reduxStore.dispatch({
                type:LOGGED_IN,
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