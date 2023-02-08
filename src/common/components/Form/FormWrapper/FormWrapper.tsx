import React, { memo, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './FormWrapper.module.scss'

type FormWrapperType = {
  children?: ReactNode
  title: string
  forgot?: boolean
  questionText?: string
  recoveryPath?: string
  linkTitle?: string
  linkPath?: string
}

export const FormWrapper = memo(
  ({
    children,
    title,
    forgot,
    questionText,
    recoveryPath,
    linkTitle,
    linkPath,
  }: FormWrapperType) => {
    const navigate = useNavigate()

    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.innerWrapper}>
            <h3 className={s.title}>{title}</h3>
            {children}
            {forgot && (
              <span
                onClick={() => navigate(recoveryPath || '', { replace: true })}
                className={s.recoveryLink}
              >
                Forgot Password?
              </span>
            )}
            {questionText && <span className={s.textQuestion}>{questionText}</span>}
            {linkPath && (
              <span
                className={s.linkRegistration}
                onClick={() => navigate(linkPath, { replace: true })}
              >
                {linkTitle}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)
