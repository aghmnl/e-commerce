import { createStore } from "redux";
import store from "./reducers";
export default createStore(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());