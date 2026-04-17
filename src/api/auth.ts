import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { api } from "./basicApi";
import {
  UserRegistration,
  AuthData,
  RefreshServise,
  Token,
  Profile,
} from "../types";
import { accessToken } from "../authService";
import { store } from "../store/store";
import { setSuccessfulLogin, logout } from "../store/slices/authSlice";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const logoutUser = (): void => {
  accessToken.clear();
  localStorage.removeItem("refreshToken");
  store.dispatch(logout());
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

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || isAuthError(error)) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((error) => Promise.reject(error));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await api.post(`/auth/refresh`, {
        refreshToken: refreshToken,
      } as RefreshServise);

      accessToken.value = data.accessToken;
      localStorage.setItem("refreshToken", data.refreshToken);
      store.dispatch(setSuccessfulLogin(data.accessToken));

      processQueue(null, data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (errorRefresh) {
      processQueue(errorRefresh, null);
      logoutUser();
      return Promise.reject(errorRefresh);
    } finally {
      isRefreshing = false;
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
