import s from "./Todolist.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getTasksTC } from "../../../BLL/reducers/TasksSlice";
import { TodolistHeader } from "./TodolistHeader/TodolistHeader";
import { PATH } from "../../constants/path";
import { EditTodo } from "../EditToDo/EditTodo";

export const Todolist = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getTasksTC(id));
  }, [id]);

  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);

  const todos = useAppSelector((state) => state.todoData.todos);

  if (!isLoggedIn) return <Navigate to={PATH.login} />;

  const currentTodo = todos.find((t) => t.id === id);

  const title = currentTodo?.title || "";

  if (!id) return null;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <TodolistHeader title={title} id={id} />
      </div>
      <EditTodo todolistId={id} title={title} />
    </div>
  );
};
