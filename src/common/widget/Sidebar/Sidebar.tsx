import React from 'react'

import hide from '../../../assets/hide.svg'
import logo from '../../../assets/logo.svg'
import visibleImg from '../../../assets/visible.svg'
import { setHide } from '../../../BLL/reducers/AppSlice'
import { Logo } from '../../components/Logo/Logo'
import { TodosLink } from '../../components/TodosLink/TodosLink'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isHide = useAppSelector(state => state.appData.isHide)

  return (
    <div className={isHide ? `${s.container} ${s.hide}` : s.container}>
      <div className={s.innerWrapper}>
        <div className={s.logoContainer}>
          <Logo img={logo} />
        </div>
        <TodosLink />
        <div onClick={() => dispatch(setHide(true))} className={s.hideContainer}>
          <div className={s.hideImgContainer}>
            <img className={s.icon} src={hide} alt="hide" />
          </div>

          <div>Hide Sidebar</div>
        </div>
      </div>
    </div>
  )
}
