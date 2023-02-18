import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppError, setAppStatus } from "../../BLL/reducers/AppSlice";

// import { AppThunk } from '../../app/store';
// import { packsAPI } from '../../api/packs-api';

export const errorUtils = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch
) => {
  const err = e as Error | AxiosError<{ error: string }>;

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;

    dispatch(setAppError(error));
  } else {
    dispatch(setAppError(`Native error ${err.message}`));
  }
  dispatch(setAppStatus("failed"));
};
