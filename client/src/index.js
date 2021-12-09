import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import theme from './theme/theme';

import store from "./store/index";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
