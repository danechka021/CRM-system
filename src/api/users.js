import { api } from "./basicApi";

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const getUserProfile = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};
