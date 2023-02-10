import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusType = "idle" | "loading" | "failed" | "success";

type initialStateType = {
  isInitialized: boolean;
  status: StatusType;
  isOpenEditTodoModal: boolean;
};

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle",
    isOpenEditTodoModal: false,
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
  },
});

export default AppSlice.reducer;
export const { setAppInitialization, setAppStatus, isOpenEditTodoModalAC } =
  AppSlice.actions;
