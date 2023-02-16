import React, { useEffect, useState } from "react";
import s from "./TaskColumn.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { TaskType } from "../../../../BLL/reducers/TasksSlice";
import { EditTask } from "../../EditTask/EditTask";
import { isOpenEditTaskModalAC } from "../../../../BLL/reducers/AppSlice";
import { dateHandler } from "../../../utils/dateHandler";

type TaskColumnType = {
  title: string;
  tasks: TaskType[];
};

const TaskColumn: React.FC<TaskColumnType> = React.memo(({ tasks, title }) => {
  const [taskId, setTaskId] = useState("");

  const isOpenEditTaskModal = useAppSelector(
    (state) => state.appData.isOpenEditTaskModal
  );
  const dispatch = useAppDispatch();

  return (
    <div className={s.column}>
      <div className={s.titleContainer}>
        <div className={`${s.circle} ${s[title]}`} />
        <h2 className={s.title}>
          {title}({tasks.length})
        </h2>
      </div>
      {tasks.map((t) => {
        const changeTaskHandler = () => {
          setTaskId(t.id);
          dispatch(isOpenEditTaskModalAC(true));
        };
        return (
          <div onClick={changeTaskHandler} className={s.blockTask} key={t.id}>
            <div className={s.blockText}>
              <div className={s.blockTaskTitle}>{t.title}</div>
              <div>{t.description ? t.description : "description"}</div>
            </div>
            <div className={s.blockDate}>
              <div>{dateHandler(t.startDate)}</div>
              <div>{dateHandler(t.deadline)}</div>
            </div>
          </div>
        );
      })}
      {isOpenEditTaskModal && taskId && <EditTask taskId={taskId} />}
    </div>
  );
});

export default TaskColumn;
