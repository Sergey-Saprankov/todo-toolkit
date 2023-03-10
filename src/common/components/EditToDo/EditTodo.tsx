import React, { ChangeEvent, memo, MouseEvent, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './EditTodo.module.scss'

import close from 'assets/close.svg'
import { isOpenEditTodoModalAC } from 'BLL/reducers/AppSlice'
import { deleteTodoTC, updateTodoTC } from 'BLL/reducers/TodolistSlice'
import { PATH } from 'common/constants/path'
import { useAppDispatch } from 'common/hooks/hooks'

type AddNewBoardType = {
  todolistId: string
  title: string
}

export const EditTodo: React.FC<AddNewBoardType> = memo(({ todolistId, title }) => {
  const dispatch = useAppDispatch()
  const [newTodoTitle, setNewTodoTitle] = useState(title)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (newTodoTitle !== title) {
      setNewTodoTitle(title)
    }
  }, [title])

  const closeModalHandler = () => {
    if (!newTodoTitle) {
      setNewTodoTitle(title)
    }
    dispatch(isOpenEditTodoModalAC(false))
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.currentTarget.value)
    if (!newTodoTitle) {
      setError('Please add To-do List Name')
    }
  }

  const onBlurHandler = () => {
    if (!newTodoTitle) {
      setError('Please add To-do List Name')
    }
  }

  const updateToDoHandler = () => {
    if (newTodoTitle.trim()) {
      dispatch(updateTodoTC({ todolistId, title: newTodoTitle }))
      dispatch(isOpenEditTodoModalAC(false))
      setError('')
    }
  }

  const deleteToDoHandler = () => {
    dispatch(deleteTodoTC(todolistId))
    dispatch(isOpenEditTodoModalAC(false))

    return navigate(PATH.todos)
  }

  const clickContent = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div onClick={closeModalHandler} className={s.wrapper}>
      <div onClick={clickContent} className={s.container}>
        <button onClick={closeModalHandler} className={s.close}>
          <img className={s.closeImg} src={close} alt="close" />
        </button>
        <div className={s.innerWrapper}>
          <h2 className={s.title}>Edit To-do List</h2>
          <div className={s.addNameContainer}>
            <div className={s.text}>To-do List Name</div>

            <input
              onBlur={onBlurHandler}
              value={newTodoTitle}
              onChange={onChangeName}
              className={
                error ? `${s.changeName} ${s.text} ${s.errorInput}` : `${s.changeName} ${s.text}`
              }
              type="text"
              placeholder={'Please add To-do List Name'}
            />
            {!newTodoTitle && <div className={s.error}>{error}</div>}
          </div>
          {/*<div className={s.columnsWrapper}>*/}
          {/*  <div className={s.text}>To-do Columns</div>*/}
          {/*  <div className={s.item}>todo</div>*/}
          {/*  <div className={s.item}>doing</div>*/}
          {/*  <div className={s.item}>done</div>*/}
          {/*  <div className={s.item}>draft</div>*/}
          {/*</div>*/}
          <button onClick={deleteToDoHandler} className={`${s.btn} ${s.delete}`}>
            Delete
          </button>
          <button disabled={!newTodoTitle} onClick={updateToDoHandler} className={s.btn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
})
