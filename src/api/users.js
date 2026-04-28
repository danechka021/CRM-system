import { api } from "./basicApi";

export const getUsers = async (page = 0, limit = 20) => {
  const { data } = await api.get("/admin/users", {
    params: { page: page - 1, limit },
  });
  return data;
};

export const getUserProfile = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};

export const blockUser = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/block`);
  return data;
};

export const unblockUser = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/unblock`);
  return data;
};

export const editUserProfile = async (id) => {
  const { data } = await api.put(`/admin/users/${id}`);
  console.log(data);
  return data;
};
