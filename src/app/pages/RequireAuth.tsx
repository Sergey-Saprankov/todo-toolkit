import React from "react";
import { useAppSelector } from "../../common/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../common/constants/path";

export const RequireAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />;
  }
  return <Outlet />;
};
