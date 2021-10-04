import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    error: errorReducer 
});

export default rootReducer;