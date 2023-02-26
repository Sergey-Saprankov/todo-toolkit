import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Todolist } from '../../common/components/Todolist/Todolist'
import { PATH } from '../../common/constants/path'
import { Login } from '../../features/Login/Login'

import { Main } from './Main/Main'
import { RequireAuth } from './RequireAuth'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<Main />}>
          <Route path={'/'} element={<Navigate to={PATH.todos} />} />
          <Route path={PATH.todos} element={<Todolist />} />
          <Route path={PATH.todolist} element={<Todolist />} />
        </Route>
      </Route>
    </Routes>
  )
}
