import { UPDATE_PROFILE } from "../reduxActions/actionTypes";

const initialState = {
    profileUpdated: false
}

export default function updateProfileReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_PROFILE:
            return {...state,
                profileUpdated: true,
                message: action.payload};
        default:
            return state;
    }
}
