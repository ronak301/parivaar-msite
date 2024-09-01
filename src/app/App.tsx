import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "../modules/authentication/screens/LoginScreen.tsx";
import MembersList from "../modules/directory/screens/MembersList.tsx";
import { Text } from "@chakra-ui/react";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/"
        element={true ? <MembersList /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
