import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth-api";
import { setAppInitialization, setAppStatus } from "./AppSlice";
import { FieldValues } from "react-hook-form";
import { errorUtils } from "../../common/utils/errorHandler";

type InitialStateType = {
  isLoggedIn: boolean;
};

export const meTC = createAsyncThunk("@@authME", async (_, { dispatch }) => {
  const response = await authApi.getMe();
  try {
    if (!response.data.resultCode) {
      dispatch(isLoggedIn(true));
    }
  } catch (e: any) {
    errorUtils(e, dispatch);
  } finally {
    dispatch(setAppInitialization(true));
  }
});

export const logoutTC = createAsyncThunk("logout", async (_, { dispatch }) => {
  try {
    dispatch(setAppStatus("loading"));
    const res = await authApi.logout();
    if (!res.resultCode) {
      dispatch(isLoggedIn(false));
      dispatch(setAppStatus("success"));
    } else {
      dispatch(setAppStatus("failed"));
    }
  } catch (e: any) {
    errorUtils(e, dispatch);
    dispatch(setAppStatus("failed"));
  }
});

export const loginTC = createAsyncThunk(
  "login",
  async (data: FieldValues, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.login(data);
      if (!res.resultCode) {
        dispatch(isLoggedIn(true));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
      }
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(setAppStatus("failed"));
    }
  }
);

export const authReducerSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  } as InitialStateType,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default authReducerSlice.reducer;
export const { isLoggedIn } = authReducerSlice.actions;
