import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { getEventsThunk } from "./events";
import auth from "./auth";
import taskReducer from "./task";

const reducer = combineReducers({ auth, getEventsThunk, tasks: taskReducer });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./events";
export * from "./task";
