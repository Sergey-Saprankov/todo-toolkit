import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import s from "./AddNewTodo.module.css";
import { useAppDispatch } from "../../hooks/hooks";
import close from "../../../assets/close.svg";

export const AddNewTodo = React.memo(() => {
  const dispatch = useAppDispatch();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [error, setError] = useState("");
  const onClickHandler = () => {
    // dispatch(setModalStatusAC(false, "newTodoModal"));
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.currentTarget.value);
  };

  const addedTodoListOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTodoTitle.trim()) {
        // dispatch(addTodoListTC(newTodoTitle));
        setNewTodoTitle("");
        setError("");
        // dispatch(setModalStatusAC(false, "newTodoModal"));
      } else {
        setError("Please add To-do List Name");
      }
    }
  };

  const addedNewToDoHandler = () => {
    if (newTodoTitle.trim()) {
      // dispatch(addTodoListTC(newTodoTitle));
      setNewTodoTitle("");
      setError("");
      // dispatch(setModalStatusAC(false, "newTodoModal"));
    } else {
      setError("Please add To-do List Name");
    }
  };
  return (
    <div className={"isOpen" ? `${s.wrapper} ${s.openModal}` : s.wrapper}>
      <div className={s.container}>
        <button onClick={onClickHandler} className={s.close}>
          <img className={s.closeImg} src={close} alt="close" />
        </button>
        <div className={s.innerWrapper}>
          <h2 className={s.title}>Add New To-do List</h2>
          <div className={s.addNameContainer}>
            <div className={s.text}>To-do List Name</div>

            <input
              onKeyDown={addedTodoListOnEnter}
              value={newTodoTitle}
              onChange={onChangeName}
              className={
                error
                  ? `${s.changeName} ${s.text} ${s.error}`
                  : `${s.changeName} ${s.text}`
              }
              type="text"
              placeholder={"Please add To-do List Name"}
            />
          </div>
          <div className={s.columnsWrapper}>
            <div className={s.text}>To-do Columns</div>
            <div className={s.item}>todo</div>
            <div className={s.item}>doing</div>
            <div className={s.item}>done</div>
            <div className={s.item}>draft</div>
          </div>
          <button onClick={addedNewToDoHandler} className={s.btn}>
            Create New To-do List
          </button>
        </div>
      </div>
    </div>
  );
});
