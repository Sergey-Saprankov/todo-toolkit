import { instance } from "./instance";
import { ResponseType } from "./todoListsApi";
import { FieldValues } from "react-hook-form";

export const authApi = {
  getMe: () => {
    return instance.get<ResponseType<MeType>>(`/auth/me`);
  },
  logout: () => {
    return instance.delete<{}, ResponseType>(`/auth/login`);
  },
  login: (data: FieldValues) => {
    return instance.post<FieldValues, ResponseType<{ userId: number }>>(
      `/auth/login`,
      data
    );
  },
};

export type MeType = {
  id: number;
  email: string;
  login: string;
};
