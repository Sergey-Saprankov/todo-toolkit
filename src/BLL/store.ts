import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/TodolistSlice";
import tasksReducer from "./reducers/TasksSlice";

export const store = configureStore({
  reducer: {
    todoData: todosReducer,
    tasksData: tasksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
