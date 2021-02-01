import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { main } from "../reducers/main.js";

const store = createStore( combineReducers( { main }), {}, applyMiddleware( thunk )  );

export default store;