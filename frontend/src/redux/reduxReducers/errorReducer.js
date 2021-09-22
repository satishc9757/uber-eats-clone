import { ERROR } from "../reduxActions/actionTypes";

const initialState = {
    error: {}
}

export default function (state = initialState, action){
    switch(action.type){
        case ERROR: 
            console.log("ERROR reducer ");
            return {...state, error: action.payload};
        default:
            return state; 
    }
}