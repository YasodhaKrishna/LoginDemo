import { render, screen } from "@testing-library/react";

import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { checkLoginCredentials } from "../sagas/saga";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(checkLoginCredentials);

jest.mock("react-router");
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root") || div
  );
  ReactDOM.unmountComponentAtNode(div);
});
