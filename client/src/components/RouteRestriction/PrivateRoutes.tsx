import React from "react";

import useAuth from "../../util/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
