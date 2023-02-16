import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./EditTask.module.scss";
import {
  deleteTaskTC,
  TaskType,
  updateTaskTC,
} from "../../../BLL/reducers/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import close from "../../../assets/close.svg";
import { isOpenEditTaskModalAC } from "../../../BLL/reducers/AppSlice";
import { UpdateModelType } from "../../../api/tasksApi";
import { dateHandler } from "../../utils/dateHandler";
import { useParams } from "react-router-dom";

type EditTaskType = {
  taskId: string;
};

export const EditTask: React.FC<EditTaskType> = React.memo(({ taskId }) => {
  const { todolistID } = useParams<{ todolistID: string }>();
  if (!todolistID) return null;
  const task = useAppSelector((state) => state.tasksData.tasks)[
    todolistID
  ].find((t) => t.id === taskId);

  if (!task) return null;
  const dispatch = useAppDispatch();

  let {
    priority,
    id,
    title,
    order,
    addedDate,
    startDate,
    deadline,
    status,
    description,
    todoListId,
    completed,
  } = task;

  // useEffect(() => {
  //   setNewTitle(title);
  //   setNewDescription(description);
  //   setNewStartDate(dateHandler(startDate));
  //   setNewDeadline(dateHandler(deadline));
  //   setNewStatus(status);
  // }, [task]);

  const [newTitle, setNewTitle] = useState(title);

  const [newDescription, setNewDescription] = useState(description);
  const [newStartDate, setNewStartDate] = useState(dateHandler(startDate));
  const [newDeadline, setNewDeadline] = useState(dateHandler(deadline));
  const [newStatus, setNewStatus] = useState(status);

  const closeModalHandler = () => {
    setNewTitle(title);
    setNewDescription(description ? description : "");
    setNewStartDate(startDate ? dateHandler(startDate) : "2023-01-13");
    setNewDeadline(deadline ? dateHandler(deadline) : "2023-02-13");
    setNewStatus(0);
    dispatch(isOpenEditTaskModalAC(false));
  };

  const model: UpdateModelType = {
    title: newTitle,
    description: newDescription,
    status: newStatus,
    priority,
    startDate: new Date(newStartDate),
    deadline: new Date(newDeadline),
    completed,
  };

  const onChangeDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDeadline(e.currentTarget.value);
  };

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStartDate(e.currentTarget.value);
  };

  const deleteTaskHandler = () => {
    dispatch(isOpenEditTaskModalAC(false));
    dispatch(deleteTaskTC({ todolistId: todoListId, taskId: id }));
  };

  const saveChangesTask = () => {
    dispatch(
      updateTaskTC({ todolistId: todoListId, taskId: id, updateModel: model })
    );
    dispatch(isOpenEditTaskModalAC(false));
  };

  const onChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.currentTarget.value);
  };

  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(Number(e.currentTarget.value));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.innerWrapper}>
        <div className={s.container}>
          <button className={s.close}>
            <img
              onClick={closeModalHandler}
              className={s.closeImg}
              src={close}
              alt="close"
            />
          </button>
          <div className={s.contentWrapper}>
            <h3 className={s.title}>Edit Task</h3>

            <div className={s.blockInputTitle}>
              <label>
                Title
                <input
                  onChange={onChangeTitleTask}
                  value={newTitle}
                  className={s.input}
                  type="text"
                  placeholder={"Add your title"}
                />
              </label>
            </div>

            <label>
              <div className={s.blockTextArea}>
                <span>Description</span>
                <textarea
                  onChange={onChangeTextArea}
                  value={newDescription}
                  name=""
                  placeholder={
                    description
                      ? description
                      : "e.g. It’s always good to take a break. This 15 minute break will \n" +
                        "recharge the batteries a little."
                  }
                ></textarea>
              </div>
            </label>

            <div className={s.dateContainer}>
              <label>
                <span>Start Date</span>
                <input
                  onChange={onChangeStartDate}
                  value={newStartDate}
                  className={s.date}
                  type="date"
                />
              </label>
              <label>
                <span>Deadline</span>
                <input
                  value={newDeadline}
                  onChange={onChangeDeadline}
                  className={s.date}
                  type="date"
                />
              </label>
            </div>

            <div className={s.statusContainer}>
              <label>
                <span>Status</span>
                <select
                  value={newStatus}
                  onChange={onChangeStatus}
                  className={s.input}
                >
                  <option value={0}>Todo</option>
                  <option value={1}>Doing</option>
                  <option value={2}>Done</option>
                </select>
              </label>
            </div>

            <button
              onClick={deleteTaskHandler}
              className={`${s.btn} ${s.delete}`}
            >
              Delete
            </button>
            <button onClick={saveChangesTask} className={s.btn}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
