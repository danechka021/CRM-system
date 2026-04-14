import axios from "axios";
import { api } from "./basicApi";
import {
  UserRegistration,
  AuthData,
  RefreshServise,
  Token,
  Profile,
} from "../types";
import { accessToken } from "../authService";

export let isAuthorized = false;
export const setAuthState = (state: boolean) => {
  isAuthorized = state;
  window.dispatchEvent(new Event("authChange"));
};

export const logoutUser = (): void => {
  accessToken.clear();
  localStorage.removeItem("refreshToken");
  setAuthState(false);
  window.location.href = "/auth";
};

const isAuthError = (error: any): boolean => {
  const authEndpoints = ["/auth/signin", "/auth/signup", "/auth/refresh"];
  return authEndpoints.some((url) => error.config?.url?.includes(url));
};

api.interceptors.request.use((config) => {
  const token = accessToken.value;
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
      const { data } = await api.post(`/auth/refresh`, {
        refreshToken: refreshToken,
      } as RefreshServise);

      accessToken.value = data.accessToken;
      localStorage.setItem("refreshToken", data.refreshToken);
      setAuthState(true);

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
