import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusType = "idle" | "loading" | "failed" | "success";

type initialStateType = {
  isInitialized: boolean;
  status: StatusType;
  isOpenEditTodoModal: boolean;
  isOpenAddTodoModal: boolean;
  isOpenAddTaskModal: boolean;
  isOpenEditTaskModal: boolean;
};

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle",
    isOpenEditTodoModal: false,
    isOpenAddTodoModal: false,
    isOpenAddTaskModal: false,
    isOpenEditTaskModal: false,
  } as initialStateType,
  reducers: {
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
} = AppSlice.actions;
