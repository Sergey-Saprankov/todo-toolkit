import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { FieldValues } from 'react-hook-form'

import { TodolistState } from '../BLL/reducers/TodolistSlice'

import { instance } from './instance'

export const todoListsApi = {
  getTodos: () => {
    return instance.get<TodolistState[]>(`/todo-lists`)
  },

  createTodo: (title: string) => {
    return instance.post<ResponseType<{ item: TodolistState }>>(`/todo-lists`, {
      title,
    })
  },

  deleteTodo: (todolistId: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },

  updateTodo: (todolistId: string, title: string) => {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title })
  },
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: []
  data: T
}
