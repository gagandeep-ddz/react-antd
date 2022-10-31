import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "../containers/Users/Users";
import UserDetails from "../containers/UserDetails/UserDetails";
import ErrorScreen from "../components/ErrorScreen/ErrorScreen";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Users />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route
          path="/error/:error/:label/:fallBackRoute"
          element={<ErrorScreen />}
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
