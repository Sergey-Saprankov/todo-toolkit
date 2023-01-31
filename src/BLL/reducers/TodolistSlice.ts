import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoListsApi } from "../../API/todoListsApi";
import { logDOM } from "@testing-library/react";
import { addTodosByTasks } from "./TasksSlice";

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
    const response = await todoListsApi.getTodos();
    try {
      dispatch(getTodos(response.data));
    } catch (e: any) {}
  }
);

export const addTodoTC = createAsyncThunk(
  "@@add-todo",
  async (title: string, { dispatch }) => {
    const response = await todoListsApi.createTodo(title);
    try {
      dispatch(addTodo(response.data.data.item));
      dispatch(addTodosByTasks(response.data.data.item.id));
    } catch (e: any) {}
  }
);

export const deleteTodoTC = createAsyncThunk(
  "@@delete-todo",
  async (todolistId: string, { dispatch }) => {
    const response = await todoListsApi.deleteTodo(todolistId);
    try {
      if (!response.data.resultCode) {
        dispatch(deleteTodo(todolistId));
      }
    } catch (e: any) {}
  }
);

export const updateTodoTC = createAsyncThunk(
  "@@update-todo",
  async (model: ModelType, { dispatch }) => {
    const { todolistId, title } = model;
    const response = await todoListsApi.updateTodo(todolistId, title);
    try {
      if (!response.data.resultCode) {
        dispatch(updateTodo(model));
      }
    } catch (e: any) {}
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
