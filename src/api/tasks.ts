import axios from "axios";

import {
  Todo,
  MetaResponse,
  TodoRequest,
  TodoInfo,
  TaskStatus,
} from "../types";

const API_URL = "https://easydev.club/api/v1/todos";

// POST (Отправка задачи на сервер)

export const addTask = async (todoRequest: TodoRequest): Promise<Todo> => {
  try {
    const { data } = await axios.post<Todo>(API_URL, todoRequest);
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
  let url = API_URL;
  url += `?filter=${status}`;
  try {
    const { data } = await axios.get<MetaResponse<Todo, TodoInfo>>(url);
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
    const { data } = await axios.put<Todo>(`${API_URL}/${taskId}`, updatedTodo);
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
    await axios.delete(`${API_URL}/${id}`);
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
