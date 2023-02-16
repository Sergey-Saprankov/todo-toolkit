import s from "./Todolist.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getTasksTC } from "../../../BLL/reducers/TasksSlice";
import { TodolistHeader } from "./TodolistHeader/TodolistHeader";
import { PATH } from "../../constants/path";
import { EditTodo } from "../EditToDo/EditTodo";
import { Logo } from "../Logo/Logo";
import { AddNewTodo } from "../AddNewTodo/AddNewTodo";
import { Tasks } from "../Task/Tasks";
import { AddTask } from "../AddTask/AddTask";
import { EditTask } from "../EditTask/EditTask";

export const Todolist = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isOpenEditTaskModal,
    isOpenAddTodoModal,
    isOpenEditTodoModal,
    isOpenAddTaskModal,
  } = useAppSelector((state) => state.appData);

  const isOpenModal =
    isOpenEditTaskModal ||
    isOpenAddTodoModal ||
    isOpenEditTodoModal ||
    isOpenAddTaskModal;

  const todos = useAppSelector((state) => state.todoData.todos);
  const currentTodo = todos.find((t) => t.id === id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getTasksTC(id));
  }, [id]);

  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);

  if (!isLoggedIn) return <Navigate to={PATH.login} />;

  const title = currentTodo?.title || "";

  if (!id) return null;
  return (
    <div className={s.container}>
      <div className={isOpenModal ? `${s.wrapper} ${s.isOpen}` : s.wrapper}>
        <TodolistHeader title={title} id={id} />
        <Tasks todoListId={id} />
      </div>
      {isOpenEditTodoModal && <EditTodo todolistId={id} title={title} />}
      {isOpenAddTaskModal && <AddTask />}
    </div>
  );
};
