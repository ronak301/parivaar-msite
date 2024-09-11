import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "../modules/authentication/screens/LoginScreen.tsx";
import MembersList from "../modules/directory/screens/MembersList.tsx";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { RootState } from "./store.ts";
import Privacy from "../modules/authentication/screens/Privacy";
import Terms from "../modules/authentication/screens/Terms";

const App = () => {
  const accessToken = useSelector(
    (state: RootState) => state?.auth?.accessToken
  );
  const isLoggedIn = !isEmpty(accessToken);
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/"
        element={isLoggedIn ? <MembersList /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
