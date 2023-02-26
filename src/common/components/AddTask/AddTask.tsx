import React, { ChangeEvent, KeyboardEvent, useState, MouseEvent, memo } from 'react'

import { useParams } from 'react-router-dom'

import s from '../AddNewTodo/AddNewTodo.module.scss'

import close from 'assets/close.svg'
import { isOpenAddTaskModalAC } from 'BLL/reducers/AppSlice'
import { addTaskTC } from 'BLL/reducers/TasksSlice'
import { useAppDispatch } from 'common/hooks/hooks'

export const AddTask = memo(() => {
  const { id } = useParams<{ id: string }>()

  if (!id) return null
  const dispatch = useAppDispatch()

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState('')
  const closeModalHandler = () => {
    dispatch(isOpenAddTaskModalAC(false))
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
    if (!newTaskTitle) {
      setError('Please add To-do List Name')
    }
  }

  const onBlurHandler = () => {
    if (!newTaskTitle) {
      setError('Please add To-do List Name')
    }
  }

  const addedTodoListOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTaskTitle.trim()) {
        dispatch(addTaskTC({ todolistId: id, title: newTaskTitle }))
        setNewTaskTitle('')
        setError('')
        dispatch(isOpenAddTaskModalAC(false))
      } else {
        setError('Please add To-do List Name')
      }
    }
  }

  const addedNewToDoHandler = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTaskTC({ todolistId: id, title: newTaskTitle }))
      setNewTaskTitle('')
      setError('')
      dispatch(isOpenAddTaskModalAC(false))
    } else {
      setError('Please add Task Name')
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
          <h2 className={s.title}>Add New Task</h2>
          <div className={s.addNameContainer}>
            <div className={s.text}>Task Name</div>

            <input
              onKeyDown={addedTodoListOnEnter}
              value={newTaskTitle}
              onChange={onChangeName}
              onBlur={onBlurHandler}
              className={
                error ? `${s.changeName} ${s.text} ${s.errorInput}` : `${s.changeName} ${s.text}`
              }
              type="text"
              placeholder={'Please add To-do List Name'}
            />
            {!newTaskTitle && <div className={s.error}>{error}</div>}
          </div>
          <button disabled={!newTaskTitle} onClick={addedNewToDoHandler} className={s.btn}>
            Create New Task
          </button>
        </div>
      </div>
    </div>
  )
})
