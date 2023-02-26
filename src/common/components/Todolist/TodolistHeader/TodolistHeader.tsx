import React, { memo } from 'react'

import setting from '../../../../assets/setting.svg'

import s from './TodolistHeader.module.scss'

import {
  isOpenAddTaskModalAC,
  isOpenAddTodoModalAC,
  isOpenEditTodoModalAC,
} from 'BLL/reducers/AppSlice'
import { Button } from 'common/components/Button/Button'
import { useAppDispatch } from 'common/hooks/hooks'
import { titleHandler } from 'common/utils/titleHandler'

type TodolistHeaderType = {
  title: string
  id: string
}

export const TodolistHeader: React.FC<TodolistHeaderType> = memo(({ title, id }) => {
  const dispatch = useAppDispatch()
  const openEditModal = () => {
    dispatch(isOpenEditTodoModalAC(true))
  }

  const addTaskHandler = () => {
    dispatch(isOpenAddTaskModalAC(true))
  }

  const todoTitle = titleHandler(title)

  return (
    <header className={s.header}>
      <div className={s.innerWrapper}>
        {/*<EditableSpan value={title} id={id} />*/}
        <div className={s.titleContainer}>
          <h3 className={s.title}>{todoTitle}</h3>
          <img onClick={openEditModal} className={s.iconPen} src={setting} alt="setting" />
        </div>
        <Button title={'Add Task'} callBack={addTaskHandler} />
      </div>
    </header>
  )
})
