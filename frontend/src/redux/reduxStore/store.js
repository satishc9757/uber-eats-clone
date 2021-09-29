import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reduxReducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger"

const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger)));

 export default reduxStore;