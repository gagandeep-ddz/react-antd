import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "../containers/Users/Users";
import UserDetails from "../containers/UserDetails/UserDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Users />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
