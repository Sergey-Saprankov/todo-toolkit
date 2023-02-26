import React, { memo } from 'react'

import { NavLink } from 'react-router-dom'

import s from './Link.module.scss'

import board from 'assets/board.svg'
import { titleHandler } from 'common/utils/titleHandler'

type LinkType = {
  todolistId: string
  title: string
}

export const Link: React.FC<LinkType> = memo(({ todolistId, title }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? s.active : '')}
      key={todolistId}
      to={`/todolist/${todolistId}`}
    >
      <li className={s.item}>
        <div className={s.boardIconContainer}>
          <img className={s.boardIcon} src={board} alt="board-icon" />
        </div>
        <div className={s.boardTitle}>{titleHandler(title)}</div>
      </li>
    </NavLink>
  )
})
