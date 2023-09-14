import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import  eventsReducer from "./events";
import auth from "./auth";
import users from "./users";
import taskReducer from "./task";
import aiReducer from "./ai";

const reducer = combineReducers({ auth, ai: aiReducer, events: eventsReducer, tasks: taskReducer, users });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./users";
export * from "./events";
export * from "./task";
export * from "./ai";

