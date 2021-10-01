import axios from "axios"
import reduxStore from "../../reduxStore/store";
import { ERROR, LOGGED_IN, LOGGED_OUT } from "../actionTypes";


// export const custLogin = (data) => {
//     axios.post("http://localhost:8000/customer/login", data)
//         .then(response => {
//             console.log("Response from login request ", response);
//             console.log("Store obj : "+reduxStore);
//             reduxStore.dispatch({
//                 type:LOGGED_IN,
//                 payload: response.data
//             });
//         })
//         .catch(err => {
//             console.log("Error from login request ", err);
//             reduxStore.dispatch({
//                 type:ERROR,
//                 payload: err
//             });
//         });
// }

export const custLogin2 = (data) => async dispatch => {
        console.log("Inside cust login redux ");  
        await axios.post("http://localhost:8000/customer/login", data)
        .then(response => {
            console.log("Response from login request ", response);
            //console.log("Store obj : "+reduxStore);
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
   
export const custLoginAction = (data) => {
    return {
        type:LOGGED_IN,
        payload: data
    }
}

export const custLogoutAction = (data) => {
    return {
        type:LOGGED_OUT,
        payload: data
    }
}

