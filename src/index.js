import React from "react";
import ReactDOM from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import { Provider } from "react-redux";

import { extendTheme } from "@chakra-ui/react";
import { store } from "./app/store.ts";

Box.defaultProps = {
  display: "flex",
  flexDirection: "column",
};

const theme = extendTheme({
  colors: {
    primary: "#0777FF",
    bluishBackground: "rgb(231, 240, 244)",
    darkBackground: "#1C2A4B",

    textDark: "black",
    textLight: "#666666",

    green: "#36B37E",
    lightGreen: "#EFFFF1",

    blue: "rgb(7,119,255)",
    lightBlue: "rgba(7, 119, 255, 0.1)",

    red: "#FF5630",
    lightRed: "#FFF5F5",

    yellow: "#FFAB00",
    lightYellow: "#FFFAEF",

    teal: "#48A1BC",
    purple: "#5046A4",

    border: "rgb(245,245,249)",

    borderDark: "rgb(234, 234,234)",
    link: "#0000EE",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
