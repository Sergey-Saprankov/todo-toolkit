import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  isOpenAddTaskModalAC,
  isOpenAddTodoModalAC,
} from "../../../BLL/reducers/AppSlice";
import { addTodoTC } from "../../../BLL/reducers/TodolistSlice";
import s from "../AddNewTodo/AddNewTodo.module.scss";
import close from "../../../assets/close.svg";
import { addTaskTC } from "../../../BLL/reducers/TasksSlice";

export const AddTask = React.memo(() => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;
  const dispatch = useAppDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");
  const closeModalHandler = () => {
    dispatch(isOpenAddTaskModalAC(false));
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    if (!newTaskTitle) {
      setError("Please add To-do List Name");
    }
  };

  const onBlurHandler = () => {
    if (!newTaskTitle) {
      setError("Please add To-do List Name");
    }
  };

  const addedTodoListOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTaskTitle.trim()) {
        dispatch(addTaskTC({ todolistId: id, title: newTaskTitle }));
        setNewTaskTitle("");
        setError("");
        dispatch(isOpenAddTaskModalAC(false));
      } else {
        setError("Please add To-do List Name");
      }
    }
  };

  const addedNewToDoHandler = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTaskTC({ todolistId: id, title: newTaskTitle }));
      setNewTaskTitle("");
      setError("");
      dispatch(isOpenAddTaskModalAC(false));
    } else {
      setError("Please add Task Name");
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <button onClick={closeModalHandler} className={s.close}>
          <img className={s.closeImg} src={close} alt="close" />
        </button>
        <div className={s.innerWrapper}>
          <h2 className={s.title}>Add New Task</h2>
          <div className={s.addNameContainer}>
            <div className={s.text}>Task Name</div>

            <input
              onKeyDown={addedTodoListOnEnter}
              value={newTaskTitle}
              onChange={onChangeName}
              onBlur={onBlurHandler}
              className={
                error
                  ? `${s.changeName} ${s.text} ${s.errorInput}`
                  : `${s.changeName} ${s.text}`
              }
              type="text"
              placeholder={"Please add To-do List Name"}
            />
            {!newTaskTitle && <div className={s.error}>{error}</div>}
          </div>
          <button
            disabled={!newTaskTitle}
            onClick={addedNewToDoHandler}
            className={s.btn}
          >
            Create New Task
          </button>
        </div>
      </div>
    </div>
  );
});
