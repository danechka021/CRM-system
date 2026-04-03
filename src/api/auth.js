import axios from "axios";
import { api } from "./api";

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = "/auth";
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const { data } = await axios.post(`${api}/auth/refresh`, {
          refreshToken: refreshToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        api(originalRequest);
      } catch (errorRefresh) {
        logoutUser();
        return Promise.reject(errorRefresh);
      }
    }

    return Promise.reject(error);
  },
);

export const registrationUser = async (registrationDetails) => {
  const { data } = await api.post(`/auth/signup`, registrationDetails);
  return data;
};

export const authorizeUser = async (loginDetails) => {
  const { data } = await api.post("/auth/signin", loginDetails);
  return data;
};
