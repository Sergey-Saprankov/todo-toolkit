import React from 'react'

import visibleImg from '../../../assets/visible.svg'
import { setHide } from '../../../BLL/reducers/AppSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import s from './Visible.module.scss'

const Visible = () => {
  const dispatch = useAppDispatch()
  const isHide = useAppSelector(state => state.appData.isHide)

  return (
    <div
      onClick={() => dispatch(setHide(false))}
      className={isHide ? `${s.visibleContainer} ${s.isOpen}` : s.visibleContainer}
    >
      <img className={s.icon} src={visibleImg} alt="eye" />
    </div>
  )
}

export default Visible
