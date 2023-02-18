import React, { useEffect } from "react";
import s from "./Main.module.scss";
import { Sidebar } from "../../../common/widget/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import { getTodosTC } from "../../../BLL/reducers/TodolistSlice";
import { Outlet } from "react-router-dom";
import { PATH } from "../../../common/constants/path";
import { Navigate } from "react-router-dom";
import { EditTodo } from "../../../common/components/EditToDo/EditTodo";
import { AddNewTodo } from "../../../common/components/AddNewTodo/AddNewTodo";
import { EditTask } from "../../../common/components/EditTask/EditTask";

export const Main = () => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((state) => state.appData.currentTask);
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

  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);
  if (!isLoggedIn) return <Navigate to={PATH.login} />;
  useEffect(() => {
    dispatch(getTodosTC());
  }, []);
  return (
    <div
      className={isOpenModal ? `${s.container} ${s.openModal}` : s.container}
    >
      <Sidebar />
      <Outlet />
      {isOpenAddTodoModal && <AddNewTodo />}
      {isOpenEditTaskModal && currentTask && <EditTask task={currentTask} />}
    </div>
  );
};
