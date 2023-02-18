import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "./TasksSlice";

type StatusType = "idle" | "loading" | "failed" | "success";

type initialStateType = {
  isInitialized: boolean;
  appError: string | null;
  status: StatusType;
  isOpenEditTodoModal: boolean;
  isOpenAddTodoModal: boolean;
  isOpenAddTaskModal: boolean;
  isOpenEditTaskModal: boolean;
  currentTask: TaskType;
};

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    appError: null,
    status: "idle",
    isOpenEditTodoModal: false,
    isOpenAddTodoModal: false,
    isOpenAddTaskModal: false,
    isOpenEditTaskModal: false,
    currentTask: {},
  } as initialStateType,
  reducers: {
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.appError = action.payload;
    },
    setAppInitialization: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    setAppStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    isOpenEditTodoModalAC: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditTodoModal = action.payload;
    },
    isOpenAddTodoModalAC: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddTodoModal = action.payload;
    },
    isOpenAddTaskModalAC: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddTaskModal = action.payload;
    },
    isOpenEditTaskModalAC: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditTaskModal = action.payload;
    },
    getCurrentTask: (state, action: PayloadAction<TaskType>) => {
      state.currentTask = action.payload;
    },
  },
});

export default AppSlice.reducer;
export const {
  setAppInitialization,
  setAppStatus,
  isOpenEditTodoModalAC,
  isOpenAddTodoModalAC,
  isOpenAddTaskModalAC,
  isOpenEditTaskModalAC,
  getCurrentTask,
  setAppError,
} = AppSlice.actions;
