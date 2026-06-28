import { api } from "../axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "src/store/auth.store";

type LoginResponse = {
  status: string;
  token: string;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      useAuthStore.getState().setAuth(null, data.token);
    },
  });
};
