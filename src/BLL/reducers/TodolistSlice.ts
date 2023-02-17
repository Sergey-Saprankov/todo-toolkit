import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoListsApi } from "../../api/todoListsApi";
import { logDOM } from "@testing-library/react";
import { addTodosByTasks, deleteTasksByTodo } from "./TasksSlice";
import { setAppStatus } from "./AppSlice";
import { FieldValues } from "react-hook-form";

export type TodolistState = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type ModelType = {
  todolistId: string;
  title: string;
};

type InitialStateType = {
  todos: TodolistState[];
};

export const getTodosTC = createAsyncThunk(
  "@@todos/get-todo",
  async (_, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await todoListsApi.getTodos();
      dispatch(getTodos(response.data));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      dispatch(setAppStatus("failed"));
    }
  }
);

export const addTodoTC = createAsyncThunk(
  "@@add-todo",
  async (title: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const response = await todoListsApi.createTodo(title);
      if (!response.data.resultCode) {
        dispatch(addTodo(response.data.data.item));
        dispatch(addTodosByTasks(response.data.data.item.id));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      dispatch(setAppStatus("failed"));
    }
  }
);

export const deleteTodoTC = createAsyncThunk(
  "@@delete-todo",
  async (todolistId: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));

    try {
      const response = await todoListsApi.deleteTodo(todolistId);
      if (!response.data.resultCode) {
        dispatch(deleteTodo(todolistId));
        deleteTasksByTodo(todolistId);
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      dispatch(setAppStatus("failed"));
    }
  }
);

export const updateTodoTC = createAsyncThunk(
  "@@update-todo",
  async (model: ModelType, { dispatch }) => {
    const { todolistId, title } = model;

    dispatch(setAppStatus("loading"));
    try {
      const response = await todoListsApi.updateTodo(todolistId, title);
      if (!response.data.resultCode) {
        dispatch(updateTodo(model));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      dispatch(setAppStatus("failed"));
    }
  }
);

const todolistSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  } as InitialStateType,
  reducers: {
    getTodos: (state, action: PayloadAction<TodolistState[]>) => {
      state.todos = action.payload;
    },

    addTodo: (state, action: PayloadAction<TodolistState>) => {
      state.todos.unshift(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<ModelType>) => {
      const { todolistId, title } = action.payload;
      state.todos = state.todos.map((t) =>
        t.id === todolistId ? { ...t, title } : t
      );
    },
  },
});

export const { getTodos, addTodo, deleteTodo, updateTodo } =
  todolistSlice.actions;

export default todolistSlice.reducer;