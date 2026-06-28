import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Handle token refresh logic here
      // const newToken = await refresh();
      // useAuthStore.getState().setToken(newToken);
      // originalRequest.headers.Authorization = `Bearer ${newToken}`;
      // return api(originalRequest);

      // For now, logout on 401
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
