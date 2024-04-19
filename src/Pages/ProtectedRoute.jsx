/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthProvider";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  // return
  return isAuthenticated ? <Component {...rest} /> : <Navigate to={"/login"} />;
};
