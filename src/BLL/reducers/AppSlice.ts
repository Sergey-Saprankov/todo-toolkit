import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusType = "idle" | "loading" | "failed" | "success";

type initialStateType = {
  isInitialized: boolean;
  status: StatusType;
};

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle",
  } as initialStateType,
  reducers: {
    setAppInitialization: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    setAppStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
});

export default AppSlice.reducer;
export const { setAppInitialization, setAppStatus } = AppSlice.actions;
