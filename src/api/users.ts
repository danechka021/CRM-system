import { api } from "./basicApi";

import {
  UserFilters,
  User,
  MetaResponse,
  UserRolesRequest,
  UserRequest,
} from "../types";

export const getUsers = async (
  params: UserFilters = {},
): Promise<MetaResponse<User>> => {
  const { data } = await api.get<MetaResponse<User>>("/admin/users", {
    params: {
      page: (params.page || 1) - 1,
      limit: params.limit || 20,
      sortBy: params.sortBy || "id",
      sortOrder: params.sortOrder || "asc",
      search: params.search || undefined,
      isBlocked: params.isBlocked,
    },
  });
  return data;
};

export const getUserProfile = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/admin/users/${id}`);
  return data;
};

export const blockUser = async (id: number): Promise<void> => {
  await api.post(`/admin/users/${id}/block`);
};

export const unblockUser = async (id: number): Promise<void> => {
  await api.post(`/admin/users/${id}/unblock`);
};

export const changeUserRights = async (
  id: number,
  payload: UserRolesRequest,
): Promise<User> => {
  const { data } = await api.post<User>(`admin/users/${id}/rights`, payload);
  return data;
};

export const editUserProfile = async (
  id: number,
  payload: UserRequest,
): Promise<User> => {
  const { data } = await api.put<User>(`/admin/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};
