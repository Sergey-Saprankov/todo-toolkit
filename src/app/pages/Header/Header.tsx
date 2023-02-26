import React, { memo } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import logo from '../../../assets/logo.svg'

import s from './Header.module.scss'

import { logoutTC } from 'BLL/reducers/AuthReducerSlice'
import { Button } from 'common/components/Button/Button'
import { Logo } from 'common/components/Logo/Logo'
import { PATH } from 'common/constants/path'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { useTheme } from 'styles/theme/useTheme'

export const Header = memo(() => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.authData.isLoggedIn)
  const location = useLocation()
  const disabled = location.pathname === PATH.login
  const loginHandler = () => {
    return <Navigate to={PATH.login} />
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />

          {isLoggedIn ? (
            <>
              <Button callBack={logoutHandler} title={'Log out'} />
            </>
          ) : (
            <Button isValid={!disabled} callBack={loginHandler} title={'Sign In'} />
          )}
        </div>
      </div>
    </div>
  )
})
