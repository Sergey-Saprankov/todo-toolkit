import { instance } from "./instance";
import { TodolistState } from "../BLL/reducers/TodolistSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const todoListsApi = {
  getTodos: () => {
    return instance.get<TodolistState[]>(`/todo-lists`);
  },

  createTodo: (title: string) => {
    return instance.post<ResponseType<{ item: TodolistState }>>(`/todo-lists`, {
      title,
    });
  },

  deleteTodo: (todolistId: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
  },

  updateTodo: (todolistId: string, title: string) => {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title });
  },
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: [];
  data: T;
};
