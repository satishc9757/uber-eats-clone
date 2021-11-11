import { UPDATE_DISH_DATA } from "../../reduxActions/actionTypes";

const initialState = {
    dishUpdated: false
}

export default function updateDishReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DISH_DATA:
            return {...state,
                dishUpdated: true,
                message: action.payload};
        default:
            return state;
    }
}
