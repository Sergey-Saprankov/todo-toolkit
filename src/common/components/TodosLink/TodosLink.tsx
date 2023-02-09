import { useAppSelector } from "../../hooks/hooks";
import s from "./TodosLink.module.scss";
import { NavLink } from "react-router-dom";
import board from '../../../assets/board.svg'

export const TodosLink = () => {
  const todos = useAppSelector((state) => state.todoData.todos);
  const todosLink = todos.map((t, i) => {
    return (
      <NavLink
        className={({ isActive }) => (isActive ? s.active : "")}
        key={t.id}
        to={`/todolist/${t.id}`}
      >
        <li className={s.item}>
          <div className={s.boardIconContainer}>
            <img className={s.boardIcon} src={board} alt="board-icon" />
          </div>

          <div className={s.boardTitle}>{t.title}</div>
        </li>
      </NavLink>
    );
  });
  return <div className={s.container}>{todosLink}</div>;
};
