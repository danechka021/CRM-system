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
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoRequest),
  });
  if (!response.ok)
    throw new Error(
      `Статус ошиюки при добавлении новой задачи: ${response.status} `,
    );

  const data: Todo = await response.json();
  return data;
};

// GET запрос

export const getTasks = async (
  status: TaskStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  let url = API_URL;
  url += `?filter=${status}`;

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Статус ошиюки при фильтрации по статусу задачи: ${response.status} `,
    );

  const data: MetaResponse<Todo, TodoInfo> = await response.json();
  return data;
};

// PUT запрос

export const updatesTheTask = async (
  taskId: number,
  updatedTodo: Partial<Todo>,
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok)
    throw new Error(`Статус ошибки редактировании задачи: ${response.status}`);

  const data: Todo = await response.json();
  return data;
};

// DELETE запрос

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error(
      `Статус ошибки при удалении задачи с сервера: ${response.status}`,
    );
};
