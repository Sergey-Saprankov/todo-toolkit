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

function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  console.log(todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  return (
    <div className="App">
      {todos.map((t) => {
        return (
          <div key={t.id}>
            <div>{t.title}</div>

            <button onClick={() => dispatch(deleteTodoTC(t.id))}>Delete</button>
            <button
              onClick={() =>
                dispatch(updateTodoTC({ todolistId: t.id, title: "piska" }))
              }
            >
              Update
            </button>
          </div>
        );
      })}
      <div>hi</div>
      <button onClick={() => dispatch(addTodoTC("new Todo"))}>add todo</button>
      <Routes>
        <Route path={"/"} element={<MainAsync />} />
        <Route path={"/todolist"} element={<TodolistAsync />} />
        <Route path={"/todolist/:id"} element={<TodolistAsync />} />
      </Routes>
    </div>
  );
}

export default App;
