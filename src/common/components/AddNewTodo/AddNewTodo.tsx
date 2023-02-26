import React, { ChangeEvent, useState, KeyboardEvent, MouseEvent, memo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import s from './AddNewTodo.module.scss'

import close from 'assets/close.svg'
import { isOpenAddTodoModalAC } from 'BLL/reducers/AppSlice'
import { addTodoTC } from 'BLL/reducers/TodolistSlice'

export const AddNewTodo = memo(() => {
  const dispatch = useAppDispatch()
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [error, setError] = useState('')
  const closeModalHandler = () => {
    dispatch(isOpenAddTodoModalAC(false))
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

  const addedTodoListOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTodoTitle.trim()) {
        dispatch(addTodoTC(newTodoTitle))
        setNewTodoTitle('')
        setError('')
        dispatch(isOpenAddTodoModalAC(false))
      } else {
        setError('Please add To-do List Name')
      }
    }
  }

  const addedNewToDoHandler = () => {
    if (newTodoTitle.trim()) {
      dispatch(addTodoTC(newTodoTitle))
      setNewTodoTitle('')
      setError('')
      dispatch(isOpenAddTodoModalAC(false))
    } else {
      setError('Please add To-do List Name')
    }
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
          <h2 className={s.title}>Add New To-do List</h2>
          <div className={s.addNameContainer}>
            <div className={s.text}>To-do List Name</div>

            <input
              onKeyDown={addedTodoListOnEnter}
              value={newTodoTitle}
              onChange={onChangeName}
              onBlur={onBlurHandler}
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
          {/*</div>*/}
          <button disabled={!newTodoTitle} onClick={addedNewToDoHandler} className={s.btn}>
            Create New To-do List
          </button>
        </div>
      </div>
    </div>
  )
})
