import React from "react";
import s from "./TodolistHeader.module.scss";
import { Button } from "../../Button/Button";
import pen from "../../../../assets/pencil.svg";
import { EditableSpan } from "../../EditableSpan/EditableSpan";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { isOpenEditTodoModalAC } from "../../../../BLL/reducers/AppSlice";

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

    return (
      <header className={s.header}>
        <div className={s.innerWrapper}>
          {/*<EditableSpan value={title} id={id} />*/}
          <div className={s.titleContainer}>
            <h3 className={s.title}>{`${title} tasks`}</h3>
            <img
              onClick={openEditModal}
              className={s.iconPen}
              src={pen}
              alt="pen"
            />
          </div>
          <Button title={"Add Task"} />
        </div>
      </header>
    );
  }
);
