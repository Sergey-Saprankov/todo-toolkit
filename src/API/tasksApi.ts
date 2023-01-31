import { instance } from "./instance";
import { ResponseType } from "./todoListsApi";
import { TaskType } from "../BLL/reducers/TasksSlice";

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`);
  },
};

export type GetTaskResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
