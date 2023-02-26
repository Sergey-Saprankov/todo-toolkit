import React, { useEffect } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { getTasksTC } from '../../../BLL/reducers/TasksSlice'
import { PATH } from '../../constants/path'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { AddNewTodo } from '../AddNewTodo/AddNewTodo'
import { AddTask } from '../AddTask/AddTask'
import { EditTask } from '../EditTask/EditTask'
import { EditTodo } from '../EditToDo/EditTodo'
import { Logo } from '../Logo/Logo'
import { Tasks } from '../Task/Tasks'

import s from './Todolist.module.scss'
import { TodolistHeader } from './TodolistHeader/TodolistHeader'

export const Todolist = () => {
  const isLoggedIn = useAppSelector(state => state.authData.isLoggedIn)

  if (!isLoggedIn) return <Navigate to={PATH.login} />
  const isHide = useAppSelector(state => state.appData.isHide)
  const { id } = useParams<{ id: string }>()
  const { isOpenEditTaskModal, isOpenAddTodoModal, isOpenEditTodoModal, isOpenAddTaskModal } =
    useAppSelector(state => state.appData)

  const isOpenModal =
    isOpenEditTaskModal || isOpenAddTodoModal || isOpenEditTodoModal || isOpenAddTaskModal

  const todos = useAppSelector(state => state.todoData.todos)
  const currentTodo = todos.find(t => t.id === id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!id) return
    dispatch(getTasksTC(id))
  }, [id])

  const title = currentTodo?.title || ''

  if (!id) return null

  return (
    <div className={s.container}>
      <div className={isHide ? `${s.wrapper} ${s.isOpen}` : s.wrapper}>
        <TodolistHeader title={title} id={id} />
        <Tasks todoListId={id} />
      </div>
      {isOpenEditTodoModal && <EditTodo todolistId={id} title={title} />}
      {isOpenAddTaskModal && <AddTask />}
    </div>
  )
}
