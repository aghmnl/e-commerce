import { createStore, applyMiddleware, compose } from "redux";
import store from "./reducers";
import thunk from "redux-thunk";
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export default createStore(store, composeEnhancers(applyMiddleware(thunk)));