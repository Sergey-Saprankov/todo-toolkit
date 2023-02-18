import React, { useCallback, useState } from "react";
import s from "./Tasks.module.scss";
import TaskColumn from "./TaskColumn/TaskColumn";
import { useAppSelector } from "../../hooks/hooks";
import { EditTask } from "../EditTask/EditTask";

type TaskType = {
  todoListId: string;
};

export const Tasks: React.FC<TaskType> = React.memo(({ todoListId }) => {
  const tasks = useAppSelector((state) => state.tasksData.tasks);

  const currentTasks = tasks[todoListId];

  if (!currentTasks) return null;

  const todo = currentTasks?.filter((t) => t.status === 0);
  const doing = currentTasks?.filter((t) => t.status === 1);
  const done = currentTasks?.filter((t) => t.status === 2);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <TaskColumn title={"todo"} tasks={todo} />
        <TaskColumn title={"doing"} tasks={doing} />
        <TaskColumn title={"done"} tasks={done} />
      </div>
    </div>
  );
});
