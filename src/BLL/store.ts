import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/TodolistSlice";
import tasksReducer from "./reducers/TasksSlice";
import authReducer from "./reducers/AuthReducerSlice";

export const store = configureStore({
  reducer: {
    todoData: todosReducer,
    tasksData: tasksReducer,
    authData: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
