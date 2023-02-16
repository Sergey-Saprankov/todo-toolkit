import React from "react";
import s from "./TodolistHeader.module.scss";
import { Button } from "../../Button/Button";
import pen from "../../../../assets/pencil.svg";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  isOpenAddTaskModalAC,
  isOpenAddTodoModalAC,
  isOpenEditTodoModalAC,
} from "../../../../BLL/reducers/AppSlice";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../constants/path";
import { addTaskTC } from "../../../../BLL/reducers/TasksSlice";

type TodolistHeaderType = {
  title: string;
  id: string;
};

export const TodolistHeader: React.FC<TodolistHeaderType> = React.memo(
  ({ title, id }) => {
    const dispatch = useAppDispatch();
    const openEditModal = () => {
      dispatch(isOpenEditTodoModalAC(true));
    };

    const addTaskHandler = () => {
      dispatch(isOpenAddTaskModalAC(true));
    };

    return (
      <header className={s.header}>
        <div className={s.innerWrapper}>
          {/*<EditableSpan value={title} id={id} />*/}
          <div className={s.titleContainer}>
            <h3 className={s.title}>{`${title}`}</h3>
            <img
              onClick={openEditModal}
              className={s.iconPen}
              src={pen}
              alt="pen"
            />
          </div>
          <Button title={"Add Task"} callBack={addTaskHandler} />
        </div>
      </header>
    );
  }
);
