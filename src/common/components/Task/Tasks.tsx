import React, { memo } from 'react'

import { useAppSelector } from '../../hooks/hooks'

import TaskColumn from './TaskColumn/TaskColumn'
import s from './Tasks.module.scss'

type TaskType = {
  todoListId: string
}

export const Tasks: React.FC<TaskType> = memo(({ todoListId }) => {
  const tasks = useAppSelector(state => state.tasksData.tasks)

  const currentTasks = tasks[todoListId]

  if (!currentTasks) return null

  const todo = currentTasks?.filter(t => t.status === 0)
  const doing = currentTasks?.filter(t => t.status === 1)
  const done = currentTasks?.filter(t => t.status === 2)

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <TaskColumn title={'todo'} tasks={todo} />
        <TaskColumn title={'doing'} tasks={doing} />
        <TaskColumn title={'done'} tasks={done} />
      </div>
    </div>
  )
})
