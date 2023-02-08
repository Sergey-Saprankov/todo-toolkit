import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../BLL/reducers/TodolistSlice";
import tasksReducer from "../BLL/reducers/TasksSlice";
import authReducer from "../BLL/reducers/AuthReducerSlice";
import appReducer from "../BLL/reducers/AppSlice";

export const store = configureStore({
  reducer: {
    todoData: todosReducer,
    tasksData: tasksReducer,
    authData: authReducer,
    appData: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
