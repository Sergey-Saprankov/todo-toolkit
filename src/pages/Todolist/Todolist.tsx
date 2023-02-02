import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  addTaskTC,
  deleteTaskTC,
  getTasks,
  getTasksTC,
  updateTaskTC,
} from "../../BLL/reducers/TasksSlice";
import { deleteTodoTC } from "../../BLL/reducers/TodolistSlice";
import { UpdateModelType } from "../../API/tasksApi";

type TodolistType = {
  id: string;
};

const Todolist: React.FC<TodolistType> = ({ id }) => {
  return <div>Todo</div>;
};

export default Todolist;
