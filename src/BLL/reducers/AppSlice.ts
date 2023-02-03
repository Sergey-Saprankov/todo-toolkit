import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  isInitialized: boolean;
};

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
  } as initialStateType,
  reducers: {
    setAppInitialization: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export default AppSlice.reducer;
export const { setAppInitialization } = AppSlice.actions;
