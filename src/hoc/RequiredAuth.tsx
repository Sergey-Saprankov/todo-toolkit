import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

export const RequiredAuth = () => {
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequiredAuth;
