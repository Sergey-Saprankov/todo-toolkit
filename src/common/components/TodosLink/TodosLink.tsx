import { useAppSelector } from "../../hooks/hooks";
import s from "./TodosLink.module.scss";
import { Link } from "../Link/Link";

export const TodosLink = () => {
  const todos = useAppSelector((state) => state.todoData.todos);
  const todosLink = todos.map((t, i) => {
    return <Link key={t.id} title={t.title} todolistId={t.id} />;
  });
  return (
    <div className={s.container}>
      <div className={s.boardCount}>all Todolist ({todos.length})</div>
      {todosLink}
      <div className={s.addBoardTitle}>+ Create New To-do List</div>
    </div>
  );
};
