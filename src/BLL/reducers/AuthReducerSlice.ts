import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../API/auth-api";

type InitialStateType = {
  isLoggedIn: boolean;
};

export const meTC = createAsyncThunk("@@authME", async (_, { dispatch }) => {
  const response = await authApi.getMe();
  try {
    if (!response.data.resultCode) {
      dispatch(authMe(true));
    }
  } catch (e: any) {}
});

export const authReducerSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  } as InitialStateType,
  reducers: {
    authMe: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default authReducerSlice.reducer;
export const { authMe } = authReducerSlice.actions;
