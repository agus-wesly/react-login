import { Outlet, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useLogin from "../hooks/useLogin";

const RequireLogin = ({ roles }) => {
  const { auth } = useLogin();
  const location = useLocation();
  const userRole = auth?.accessToken ? jwt_decode(auth?.accessToken) : undefined;
  return roles.find((role) => userRole?.userInfo.roles.includes(role)) ? <Outlet /> : userRole?.userInfo.roles ? <Navigate to="/unauthorized" state={{ location }} replace /> : <Navigate to="/login" state={{ location }} replace />;
};

export default RequireLogin;
