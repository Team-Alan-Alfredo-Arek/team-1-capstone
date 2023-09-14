import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import eventsReducer from "./events";
import auth from "./auth";
import users from "./users";
import taskReducer from "./task";
import chatReducer from "./chat";
import aiReducer from "./ai";

const reducer = combineReducers({
  auth,
  events: eventsReducer,
  tasks: taskReducer,
  chats: chatReducer,
  ai: aiReducer
  users,
});

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

export * from "./chat";

export * from "./ai";

