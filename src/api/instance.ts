import axios from "axios";

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
  headers: {
    "API-KEY": "26610f0b-dfa3-4af0-8c0f-815bd7226b14",
  },
});
