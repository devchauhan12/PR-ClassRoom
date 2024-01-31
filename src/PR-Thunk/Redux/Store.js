import { applyMiddleware, createStore } from "redux";
import processor from "./Reducer";
import { thunk } from "redux-thunk";

const store = createStore(processor, applyMiddleware(thunk))

export default store