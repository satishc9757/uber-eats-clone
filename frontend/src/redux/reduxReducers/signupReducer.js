import { SIGN_UP } from "../reduxActions/actionTypes";


const initialState = {
    registered: false
}

export default function signupReducer(state = initialState, action){
    switch(action.type){
        case SIGN_UP: 
            console.log("SIGN_UP reducer ");
            return {...state, 
                registered: true,
                user: action.payload};
        default:
            return state; 
    }
}

