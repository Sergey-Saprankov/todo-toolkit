import { instance } from "./instance";
import { ResponseType } from "./todoListsApi";

export const authApi = {
  getMe: () => {
    return instance.get<ResponseType<MeType>>(`/auth/me`);
  },
};

export type MeType = {
  id: number;
  email: string;
  login: string;
};
