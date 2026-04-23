import { api } from "./basicApi";

import {
  Todo,
  MetaResponse,
  TodoRequest,
  TodoInfo,
  TodoStatus,
} from "../types";

// POST (Отправка задачи на сервер)

export const addTask = async (todoRequest: TodoRequest): Promise<Todo> => {
  const { data } = await api.post<Todo>("/todos", todoRequest);
  return data;
};

// GET запрос

export const getTasks = async (
  status: TodoStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const { data } = await api.get<MetaResponse<Todo, TodoInfo>>("/todos", {
    params: { filter: status },
  });
  return data;
};

// PUT запрос

export const updateTasks = async (
  taskId: number,
  updatedTodo: Partial<Todo>,
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/todos/${taskId}`, updatedTodo);
  return data;
};

// DELETE запрос

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
