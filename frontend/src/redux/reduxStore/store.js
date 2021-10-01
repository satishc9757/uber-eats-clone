import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reduxReducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger"
import thunk from "redux-thunk" 

const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

 export default reduxStore;