import React, { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute() {
  const { auth } = useContext(AuthContext);
  return auth.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
