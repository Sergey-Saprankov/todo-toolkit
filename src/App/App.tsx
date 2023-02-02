import React, { useEffect } from "react";
import "../styles/index.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTodosTC } from "../BLL/reducers/TodolistSlice";
import { meTC } from "../BLL/reducers/AuthReducerSlice";
import { Header } from "../pages/Header/Header";
import Main from "../pages/Main/Main";
import Sidebar from "../pages/Sidebar/Sidebar";
import Login from "../pages/Login/Login";

function App() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoData.todos);
  const tasks = useAppSelector((state) => state.tasksData.tasks);
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className={`app dark`}>
      <Header />
      <Sidebar />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
