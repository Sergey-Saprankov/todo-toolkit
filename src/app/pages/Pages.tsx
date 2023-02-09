import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../../common/constants/path";
import { Login } from "../../features/Login/Login";
import { RequireAuth } from "./RequireAuth";
import {Todolist} from "./Todolist/Todolist";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path={"/"} element={<Navigate to={PATH.todos} />} />
        <Route path={PATH.todos} element={<Todolist />} />
        <Route path={PATH.todolist} element={<Todolist />} />
      </Route>
      {/* <Route path={"/404"} element={<div>Error</div>} />
      <Route path={"/*"} element={<Navigate to={"/404"} />} /> */}
    </Routes>
  );
};
