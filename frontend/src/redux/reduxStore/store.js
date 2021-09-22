import { createStore } from "redux";
import loginReducer from "../reduxReducers/loginReducer";

const reduxStore = createStore(loginReducer);

 export default reduxStore;