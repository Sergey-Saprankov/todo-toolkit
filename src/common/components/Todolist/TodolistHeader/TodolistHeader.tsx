import React from "react";
import s from "./TodolistHeader.module.scss";
import { Button } from "../../Button/Button";
import setting from "../../../../assets/setting.svg";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  isOpenAddTaskModalAC,
  isOpenAddTodoModalAC,
  isOpenEditTodoModalAC,
} from "../../../../BLL/reducers/AppSlice";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../constants/path";
import { addTaskTC } from "../../../../BLL/reducers/TasksSlice";
import { titleHandler } from "../../../utils/titleHandler";

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

    const todoTitle = titleHandler(title)

    return (
      <header className={s.header}>
        <div className={s.innerWrapper}>
          {/*<EditableSpan value={title} id={id} />*/}
          <div className={s.titleContainer}>
            <h3 className={s.title}>{todoTitle}</h3>
            <img
              onClick={openEditModal}
              className={s.iconPen}
              src={setting}
              alt="setting"
            />
          </div>
          <Button title={"Add Task"} callBack={addTaskHandler} />
        </div>
      </header>
    );
  }
);
