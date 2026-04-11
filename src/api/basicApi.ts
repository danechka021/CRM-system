import axios from "axios";

export const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
