import { GET_ORDERS } from "../reduxActions/actionTypes";

const initialState = {
    ordersData: []
}

export default function ordersDataReducer(state = initialState, action){
    switch(action.type){
        case GET_ORDERS:
            return {...state,
                ordersData: action.payload};
        default:
            return state;
    }
}
