import { LOGGED_IN, LOGGED_OUT } from "../reduxActions/actionTypes";

const initialState = {
    loggedIn: false,
    login: {},
    token: ""
}

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case LOGGED_IN:
            console.log("LOGGED_IN reducer ");
            return {...state,
                loggedIn: true,
                login: action.payload,
                token: action.payload};
        case LOGGED_OUT:
            console.log("LOGGED_OUT reducer ");
            return {...state,
                    loggedIn: false,
                    login: {},
                    token:""};
        default:
            return state;
    }
}