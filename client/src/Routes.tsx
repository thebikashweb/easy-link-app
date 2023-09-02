import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import PrivateRoutes from "./components/RouteRestriction/PrivateRoutes";
import PublicRoutes from "./components/RouteRestriction/PublicRoutes";
import Profile from "./pages/Profile/Profile";
import PasswordReset from "./pages/Auth/PasswordReset";
import ForgotPassword from "./pages/Auth/ForgotPassword";

const MainRoutes = () => (
  <Routes>
    {/** Wrap all the private routes that neeed authentication here */}
    <Route path="/" element={<PrivateRoutes />}>
      <Route path="/" element={<Navigate replace to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
    </Route>

    <Route path="" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  </Routes>
);

export default MainRoutes;
