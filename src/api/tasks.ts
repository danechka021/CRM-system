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
  try {
    const { data } = await api.post<Todo>("", todoRequest);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Ошибка при доюавлении задачи ${error.response?.status}`,
        );
      } else if (error.request) {
        throw new Error(`Сервер не отечает`);
      }
    }

    throw error;
  }
};

// GET запрос

export const getTasks = async (
  status: TaskStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const { data } = await api.get<MetaResponse<Todo, TodoInfo>>("", {
      params: { filter: status },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Ошибка при получении задачи ${error.response?.status}`,
        );
      } else if (error.request) {
        throw new Error(`Сервер не отечает`);
      }
    }
    throw error;
  }
};

// PUT запрос

export const updatesTheTask = async (
  taskId: number,
  updatedTodo: Partial<Todo>,
): Promise<Todo> => {
  try {
    const { data } = await api.put<Todo>(`/${taskId}`, updatedTodo);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Ошибка при измненении статуса задачи ${error.response?.status}`,
        );
      } else if (error.request) {
        throw new Error(`Сервер не отечает`);
      }
    }

    throw error;
  }
};

// DELETE запрос

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Ошибка при удалении  задачи ${error.response?.status}`,
        );
      } else if (error.request) {
        throw new Error(`Сервер не отечает`);
      }
    }
    throw error;
  }
};
