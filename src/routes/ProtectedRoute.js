import React, { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth.role === "ADMIN" ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
