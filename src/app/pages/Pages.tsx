import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../../common/constants/path";
import { Login } from "../../features/Login/Login";
import { RequireAuth } from "./RequireAuth";
import { Main } from "./Main/Main";
import { Todolist } from "../../common/components/Todolist/Todolist";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route element={<Main />}>
        <Route path={"/todo-toolkit"} element={<Navigate to={PATH.todos} />} />
        <Route path={PATH.todos} element={<Todolist />} />
        <Route path={PATH.todolist} element={<Todolist />} />
      </Route>
    </Routes>
  );
};
