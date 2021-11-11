import { GET_DISH_DATA } from "../../reduxActions/actionTypes";

const initialState = {
    dishesData: []
}

export default function dishesDataReducer(state = initialState, action){
    switch(action.type){
        case GET_DISH_DATA:
            console.log("Dishes data fetched : "+action.payload);
            return {...state,
                dishesData: action.payload};
        default:
            return state;
    }
}
