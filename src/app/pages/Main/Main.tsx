import React, { useEffect } from "react";
import s from './Main.module.scss';
import {Sidebar} from '../../../common/widget/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import {getTodosTC} from '../../../BLL/reducers/TodolistSlice'
import {Outlet} from 'react-router-dom';
import {PATH} from '../../../common/constants/path';
import {Navigate} from 'react-router-dom'

export const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.authData.isLoggedIn)
  if (!isLoggedIn) return <Navigate to={PATH.login}/>
  useEffect(() => {
    dispatch(getTodosTC())
  }, [])
  return (
    <div className={s.container}>
      <Sidebar />
      <Outlet />
    </div>
  )
};


