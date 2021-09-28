import { createStore } from "redux";
import rootReducer from "../reduxReducers/rootReducer";

const reduxStore = createStore(rootReducer);

 export default reduxStore;