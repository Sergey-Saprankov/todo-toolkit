import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoData.todos);
  const navigate = todos.map((t) => {
    return (
      <Link key={t.id} to={`/todolist/${t.id}`}>
        {t.title}
      </Link>
    );
  });
  return <div>{navigate}</div>;
};

export default Sidebar;
