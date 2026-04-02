import axios from "axios";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: { "Content-Type": "application/json" },
});

export const registrationUser = async (registrationDetails) => {
  console.log("zalupa");
  const { data } = await api.post(`/auth/signup`, registrationDetails);
  return data;
};

export const authorizeUser = async (loginDetails) => {
  const { data } = await api.post("/auth/signin", loginDetails);
  return data;
};

