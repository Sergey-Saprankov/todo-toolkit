import React, { memo } from 'react'

import s from './TaskColumn.module.scss'

import { getCurrentTask, isOpenEditTaskModalAC } from 'BLL/reducers/AppSlice'
import { TaskType } from 'BLL/reducers/TasksSlice'
import { useAppDispatch } from 'common/hooks/hooks'
import { dateHandler } from 'common/utils/dateHandler'

type TaskColumnType = {
  title: string
  tasks: TaskType[]
}

const TaskColumn: React.FC<TaskColumnType> = memo(({ tasks, title }) => {
  const dispatch = useAppDispatch()

  return (
    <div className={s.column}>
      <div className={s.titleContainer}>
        <div className={`${s.circle} ${s[title]}`} />
        <h2 className={s.title}>
          {title}({tasks.length})
        </h2>
      </div>
      {tasks.map(t => {
        const changeTaskHandler = () => {
          const currentTask = tasks.find(task => task.id === t.id)

          if (currentTask) {
            dispatch(getCurrentTask(currentTask))
            dispatch(isOpenEditTaskModalAC(true))
          }
        }

        // eslint-disable-next-line no-nested-ternary
        const priority = t.priority === 1 ? 'low' : t.priority === 2 ? 'middle' : 'high'

        const startDate = dateHandler(t.startDate)
        const deadline = dateHandler(t.deadline)

        return (
          <div onClick={changeTaskHandler} className={`${s.blockTask} ${s[priority]}`} key={t.id}>
            <div className={s.priority}>{priority}</div>
            <div className={s.blockText}>
              <div className={s.blockTaskTitle}>{t.title}</div>
              <div>{t.description ? t.description : 'description'}</div>
            </div>
            <div className={s.blockDate}>
              <div>Start date: {startDate === 'Invalid Date' ? '' : startDate}</div>
              <div>Deadline: {deadline === 'Invalid Date' ? '' : deadline}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default TaskColumn
