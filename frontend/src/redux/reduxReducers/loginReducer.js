import { LOGGED_IN } from "../reduxActions/actionTypes";


const initialState = {
    login: {}
}

export default function (state = initialState, action){
    switch(action.type){
        case LOGGED_IN: 
            console.log("LOGGED_IN reducer ");
            return {...state, login: action.payload};
        default:
            return state; 
    }
}