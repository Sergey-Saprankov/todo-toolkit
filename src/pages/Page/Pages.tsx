import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import RequiredAuth from "../../hoc/RequiredAuth";

const Pages = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />

      <Route element={<RequiredAuth />}>
        <Route path={"/"} element={<Navigate to={"/main"} />} />
        <Route path={"/main"} element={<Main />} />
      </Route>
    </Routes>
  );
};

export default Pages;
