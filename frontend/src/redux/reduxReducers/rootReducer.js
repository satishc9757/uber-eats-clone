import { combineReducers } from "redux";
import loginReducer from "./customer/loginReducer";
import signupReducer from "./customer/signupReducer";


const rootReducer = combineReducers({
    custLogin: loginReducer,
    custSignup: signupReducer 
});

export default rootReducer;