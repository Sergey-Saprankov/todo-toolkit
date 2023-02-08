import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../../common/constants/path";
import { Login } from "../../features/Login/Login";
import { RequireAuth } from "./RequireAuth";
import Main from "./Main/Main";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path={"/"} element={<Navigate to={PATH.main} />} />
        <Route path={PATH.main} element={<Main />} />
      </Route>
    </Routes>
  );
};
