import { api } from "./basicApi";

export const getUsers = async (params = {}) => {
  const { data } = await api.get("/admin/users", {
    params: {
      page: params.page - 1,
      limit: params.limit || 20,
      sortBy: params.sortBy || "id",
      sortOrder: params.sortOrder || "asc",
      search: params.search || undefined,
      isBlocked: params.isBlocked,
    },
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

export const changeUserRights = async (id, payload) => {
  const { data } = await api.post(`admin/users/${id}/rights`, payload);
  return data;
};

export const editUserProfile = async (id, payload) => {
  const { data } = await api.put(`/admin/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id) => {
  await api.delete(`/admin/users/${id}`);
};
