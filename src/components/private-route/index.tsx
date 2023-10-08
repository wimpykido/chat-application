import React from "react";
// import { useAuth } from "../../hooks/use-auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  console.log(auth.currentUser)
  return !auth ? <Navigate to="/error" /> : <>{children}</>;
};
