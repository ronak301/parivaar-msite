import React from "react";
import App from "./App";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Box } from "@chakra-ui/react";

const AppContainer = () => {
  return (
    <Box style={{ backgroundColor: "white", flex: 1 }}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Box>
  );
};

export default AppContainer;
