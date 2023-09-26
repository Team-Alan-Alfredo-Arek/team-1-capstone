import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { HashRouter as Router } from  "react-router-dom"; //AK changed, need to update for hash, updated to "HashRouter as"
import history from "./history";
import store from "./store";
import App from "./App";

const root = createRoot(document.getElementById("app"));

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
