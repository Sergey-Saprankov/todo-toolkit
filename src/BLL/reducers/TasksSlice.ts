import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksApi } from "../../API/tasksApi";

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type TasksStateType = {
  [key: string]: TaskType[];
};

type InitialStateType = {
  tasks: TasksStateType;
};

type GetTasks = {
  tasks: TaskType[];
  todolistId: string;
};

export const getTasksTC = createAsyncThunk(
  "@@get-tasks",
  async (todolistId: string, { dispatch }) => {
    const response = await tasksApi.getTasks(todolistId);
    try {
      const model = {
        tasks: response.data.items,
        todolistId,
      };
      dispatch(getTasks(model));
    } catch (e: any) {}
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: {},
  } as InitialStateType,
  reducers: {
    addTodosByTasks: (state, action: PayloadAction<string>) => {
      state.tasks[action.payload] = [];
    },
    getTasks: (state, action: PayloadAction<GetTasks>) => {
      const { tasks, todolistId } = action.payload;
      state.tasks[todolistId] = tasks;
    },
  },
});

export default tasksSlice.reducer;

export const { addTodosByTasks, getTasks } = tasksSlice.actions;
