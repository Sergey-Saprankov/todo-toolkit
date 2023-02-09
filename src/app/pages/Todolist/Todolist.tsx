import React, { useEffect } from "react";
import s from './Todos.module.scss';
import {Sidebar} from '../../../common/widget/Sidebar/Sidebar'

// type TodolistType = {
//   id: string;
// };

export const Todolist = () => {
  return (
    <div className={s.container}>
      <Sidebar />
    </div>
  )
};


