import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import errorReducer from "./errorReducer";
import updateProfileReducer from "./updateProfileReducer";
import dishesDataReducer from "./res/dishesDataReducer";
import dishUpdateReducer from "./res/dishUpdateReducer";
import ordersDataReducer from "./ordersDataReducer";
import placeOrderReducer from "./placeOrderReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    error: errorReducer,
    updateProfile: updateProfileReducer,
    dishes: dishesDataReducer,
    dishUpdate: dishUpdateReducer,
    res_orders: ordersDataReducer,
    place_order: placeOrderReducer
});

export default rootReducer;