import React, { useEffect } from "react";
import logo from "./logo.svg";
import "../styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { MainAsync } from "../pages/Main/Main.async";
import { TodolistAsync } from "../pages/Todolist/Todolist.async";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  addTodoTC,
  deleteTodoTC,
  getTodosTC,
  updateTodoTC,
} from "../BLL/reducers/TodolistSlice";
import { Header } from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

function App() {
  const todos = useAppSelector((state) => state.todoData.todos);
  const state = useAppSelector((state) => state);
  console.log(state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  return (
    <div className="App">
      {/*<Header />*/}
      <Sidebar />
      <Routes>
        <Route path={"/"} element={<MainAsync />} />
        <Route path={"/todolist"} element={<TodolistAsync />} />
        <Route path={"/todolist/:id"} element={<TodolistAsync />} />
      </Routes>
    </div>
  );
}

export default App;
