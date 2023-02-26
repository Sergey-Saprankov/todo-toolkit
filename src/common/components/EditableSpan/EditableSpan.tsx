import React, { ChangeEvent, useEffect, useState, FocusEvent, FormEvent } from 'react'

import { FieldValues } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import pen from '../../../assets/pencil.svg'
import submit from '../../../assets/submit.svg'
import { updateTodoTC } from '../../../BLL/reducers/TodolistSlice'
import { useAppDispatch } from '../../hooks/hooks'
import { formHandler } from '../../utils/formHandler'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  value: string
  onChange?: (newValue: string) => void
  id: string
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo(({ value, id }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    setUserName(value)
  }, [id])
  const [userName, setUserName] = useState(value)
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }
  const { errorName, register, reset, isValid, handleSubmit } = formHandler('name')

  const onSubmit = (data: FieldValues) => {
    const { name } = data

    dispatch(updateTodoTC({ todolistId: id, title: String(name) }))
  }

  return (
    <div className={s.inputWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.labelInput}>
          <input
            {...register('name')}
            value={userName}
            autoComplete={'off'}
            onChange={onChangeName}
            className={errorName ? `${s.input} ${s.errorInput}` : s.input}
          />
        </label>

        <button disabled={!isValid} type={'submit'} className={s.confirmName}>
          <img className={s.updateIcon} src={submit} alt="submit icon" />
        </button>
      </form>
      {errorName && <div className={s.errorName}>{errorName}</div>}
    </div>
  )
})
