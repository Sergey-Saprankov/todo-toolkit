import React, { ChangeEvent, memo, MouseEvent, useState } from 'react'

import s from './EditTask.module.scss'

import { UpdateModelType } from 'api/tasksApi'
import close from 'assets/close.svg'
import { isOpenEditTaskModalAC } from 'BLL/reducers/AppSlice'
import { deleteTaskTC, TaskType, updateTaskTC } from 'BLL/reducers/TasksSlice'
import { useAppDispatch } from 'common/hooks/hooks'
import { dateHandler } from 'common/utils/dateHandler'

type EditTaskType = {
  task: TaskType
}

export const EditTask: React.FC<EditTaskType> = memo(({ task }) => {
  const dispatch = useAppDispatch()

  console.log('edit')

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
  } = task

  const [newTitle, setNewTitle] = useState(title)

  const [newDescription, setNewDescription] = useState(description)
  const [newStartDate, setNewStartDate] = useState(dateHandler(startDate))
  const [newDeadline, setNewDeadline] = useState(dateHandler(deadline))
  const [newPriority, setNewPriority] = useState(priority)
  const [newStatus, setNewStatus] = useState(status)

  const closeModalHandler = () => {
    setNewTitle(title)
    setNewDescription(description ? description : '')
    setNewStartDate(startDate ? dateHandler(startDate) : '2023-01-13')
    setNewDeadline(deadline ? dateHandler(deadline) : '2023-02-13')
    setNewStatus(0)
    setNewPriority(1)
    dispatch(isOpenEditTaskModalAC(false))
  }

  const model: UpdateModelType = {
    title: newTitle,
    description: newDescription,
    status: newStatus,
    priority: newPriority,
    startDate: new Date(newStartDate),
    deadline: new Date(newDeadline),
    completed,
  }

  const onChangeDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDeadline(e.currentTarget.value)
  }

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStartDate(e.currentTarget.value)
  }

  const deleteTaskHandler = () => {
    dispatch(isOpenEditTaskModalAC(false))
    dispatch(deleteTaskTC({ todolistId: todoListId, taskId: id }))
  }

  const saveChangesTask = () => {
    dispatch(updateTaskTC({ todolistId: todoListId, taskId: id, updateModel: model }))
    dispatch(isOpenEditTaskModalAC(false))
  }

  const onChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.currentTarget.value)
  }

  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(Number(e.currentTarget.value))
  }

  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewPriority(Number(e.currentTarget.value))
  }

  const clickContent = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div onClick={closeModalHandler} className={s.wrapper}>
      <div onClick={clickContent} className={s.innerWrapper}>
        <div className={s.container}>
          <button className={s.close}>
            <img onClick={closeModalHandler} className={s.closeImg} src={close} alt="close" />
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
                  placeholder={'Add your title'}
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
                      : 'e.g. It’s always good to take a break. This 15 minute break will \n' +
                        'recharge the batteries a little.'
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
                <select value={newStatus} onChange={onChangeStatus} className={s.input}>
                  <option value={0}>Todo</option>
                  <option value={1}>Doing</option>
                  <option value={2}>Done</option>
                </select>
              </label>
            </div>

            <div className={s.statusContainer}>
              <label>
                <span>Priority</span>
                <select value={newPriority} onChange={onChangePriority} className={s.input}>
                  <option value={1}>Low</option>
                  <option value={2}>Middle</option>
                  <option value={3}>High</option>
                </select>
              </label>
            </div>

            <button onClick={deleteTaskHandler} className={`${s.btn} ${s.delete}`}>
              Delete
            </button>
            <button onClick={saveChangesTask} className={s.btn}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
