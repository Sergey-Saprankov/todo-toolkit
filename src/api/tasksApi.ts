import { TaskType } from '../BLL/reducers/TasksSlice'

import { instance } from './instance'
import { ResponseType } from './todoListsApi'

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
  },

  createTask: (todolistId: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },

  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask: (todolistId: string, taskId: string, updateModel: UpdateModelType) => {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      updateModel
    )
  },
}

export type GetTaskResponseType = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export type UpdateModelType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
}
