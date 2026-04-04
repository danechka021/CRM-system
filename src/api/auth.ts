import axios from "axios";
import { api } from "./api";
import {
  UserRegistration,
  AuthData,
  RefreshToken,
  Token,
  Profile,
} from "../types";

const baseURL = "https://easydev.club/api/v1";

export const logoutUser = (): void => {
  localStorage.clear();
  window.location.href = "/auth";
};

const isAuthError = (error: any): boolean => {
  const authEndpoints = ["/auth/signin", "/auth/signup", "/auth/refresh"];
  return authEndpoints.some((url) => error.config?.url?.includes(url));
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || isAuthError(error)) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      logoutUser();
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.post(`${baseURL}/auth/refresh`, {
        refreshToken: refreshToken,
      } as RefreshToken);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (errorRfresh) {
      logoutUser();
      return Promise.reject(errorRfresh);
    }
  },
);

export const registrationUser = async (
  registrationDetails: UserRegistration,
): Promise<Token> => {
  const { data } = await api.post<Token>(`/auth/signup`, registrationDetails);
  return data;
};

export const authorizeUser = async (loginDetails: AuthData): Promise<Token> => {
  const { data } = await api.post("/auth/signin", loginDetails);
  return data;
};

export const getUserProfile = async (): Promise<Profile> => {
  const { data } = await api.get(`/user/profile`);
  return data;
};
