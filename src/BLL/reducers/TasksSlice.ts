import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksApi, UpdateModelType } from "../../api/tasksApi";
import { ModelType } from "./TodolistSlice";
import { setAppStatus } from "./AppSlice";
import { errorUtils } from "../../common/utils/errorHandler";

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Date;
  deadline: Date;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

type InitialStateType = {
  tasks: TasksStateType;
};

type GetTasks = {
  tasks: TaskType[];
  todolistId: string;
};

type AddTask = {
  todolistId: string;
  task: TaskType;
};

type DeleteTask = {
  todolistId: string;
  taskId: string;
};

type UpdateType = {
  todolistId: string;
  taskId: string;
  updateModel: UpdateModelType;
};

export const getTasksTC = createAsyncThunk(
  "@@get-tasks",
  async (todolistId: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await tasksApi.getTasks(todolistId);
      const model = {
        tasks: response.data.items,
        todolistId,
      };
      dispatch(getTasks(model));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(setAppStatus("failed"));
    }
  }
);

export const addTaskTC = createAsyncThunk(
  "@@add-task",
  async ({ todolistId, title }: ModelType, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await tasksApi.createTask(todolistId, title);
      if (!response.data.resultCode) {
        dispatch(addTask({ todolistId, task: response.data.data.item }));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(setAppStatus("failed"));
    }
  }
);

export const deleteTaskTC = createAsyncThunk(
  "@@delete-task",
  async ({ todolistId, taskId }: DeleteTask, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await tasksApi.deleteTask(todolistId, taskId);
      if (!response.data.resultCode) {
        dispatch(deleteTask({ todolistId, taskId }));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(setAppStatus("failed"));
    }
  }
);

export const updateTaskTC = createAsyncThunk(
  "@@update-Task",
  async ({ todolistId, taskId, updateModel }: UpdateType, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await tasksApi.updateTask(
        todolistId,
        taskId,
        updateModel
      );
      if (!response.data.resultCode) {
        dispatch(
          updateTask({
            todolistId,
            taskId,
            updateModel: response.data.data.item,
          })
        );
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(setAppStatus("failed"));
    }
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
    deleteTasksByTodo: (state, action: PayloadAction<string>) => {
      delete state.tasks[action.payload];
    },
    getTasks: (state, action: PayloadAction<GetTasks>) => {
      const { tasks, todolistId } = action.payload;
      state.tasks[todolistId] = tasks;
    },
    addTask: (state, action: PayloadAction<AddTask>) => {
      state.tasks[action.payload.todolistId].unshift(action.payload.task);
    },
    deleteTask: (state, action: PayloadAction<DeleteTask>) => {
      state.tasks[action.payload.todolistId] = state.tasks[
        action.payload.todolistId
      ].filter((t) => t.id !== action.payload.taskId);
    },
    updateTask: (state, action: PayloadAction<UpdateType>) => {
      state.tasks[action.payload.todolistId] = state.tasks[
        action.payload.todolistId
      ].map((t: TaskType) =>
        t.id === action.payload.taskId
          ? { ...t, ...action.payload.updateModel }
          : t
      );
    },
  },
});

export default tasksSlice.reducer;

export const {
  addTodosByTasks,
  getTasks,
  addTask,
  deleteTask,
  deleteTasksByTodo,
  updateTask,
} = tasksSlice.actions;
