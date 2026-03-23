import axios from "axios";

import {
  Todo,
  MetaResponse,
  TodoRequest,
  TodoInfo,
  TaskStatus,
} from "../types";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1/todos",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// POST (Отправка задачи на сервер)

export const addTask = async (todoRequest: TodoRequest): Promise<Todo> => {
  const { data } = await api.post<Todo>("", todoRequest);
  return data;
};

// GET запрос

export const getTasks = async (
  status: TaskStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const { data } = await api.get<MetaResponse<Todo, TodoInfo>>("", {
    params: { filter: status },
  });
  return data;
};

// PUT запрос

export const updateTasks = async (
  taskId: number,
  updatedTodo: Partial<Todo>,
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/${taskId}`, updatedTodo);
  return data;
};

// DELETE запрос

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};
