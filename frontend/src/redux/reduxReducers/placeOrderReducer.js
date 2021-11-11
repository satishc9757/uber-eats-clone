import { PLACE_ORDER } from "../reduxActions/actionTypes";

const initialState = {
    orderPlaced: false,
}

export default function placeOrderReducer(state = initialState, action){
    switch(action.type){
        case PLACE_ORDER:
            return {...state,
                orderPlaced: true,
                payload: action.payload};
        default:
            return state;
    }
}
