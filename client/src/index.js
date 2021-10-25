import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/index";

import App from "./App";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
