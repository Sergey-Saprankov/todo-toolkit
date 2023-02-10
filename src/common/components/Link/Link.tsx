import React from "react";
import board from "../../../assets/board.svg";
import { NavLink } from "react-router-dom";
import s from "./Link.module.scss";

type LinkType = {
  todolistId: string;
  title: string;
};

export const Link: React.FC<LinkType> = React.memo(({ todolistId, title }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? s.active : "")}
      key={todolistId}
      to={`/todolist/${todolistId}`}
    >
      <li className={s.item}>
        <div className={s.boardIconContainer}>
          <img className={s.boardIcon} src={board} alt="board-icon" />
        </div>
        <div className={s.boardTitle}>{title}</div>
      </li>
    </NavLink>
  );
});
