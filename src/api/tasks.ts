import { Task, Results } from "../pages/TodoListPage";

const API_URL = "https://easydev.club/api/v1/todos";

interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

// POST (Отправка задачи на сервер)

export const addTask = async ({
  title,
  isDone,
}: TodoRequest): Promise<Task> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isDone }),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при добавлении новой задачи: ${response.status} `,
      );

    const data: Task = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    } else {
      throw new Error("Ошибка при добавлении задачи");
    }
  }
};

// GET запрос

export const getTasks = async (status: string): Promise<Results> => {
  let url = API_URL;
  if (status) {
    url += `?filter=${status}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при фильтрации по статусу задачи: ${response.status} `,
      );

    const data: Results = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    } else {
      throw new Error("Ошибка при добавлении задачи");
    }
  }
};

// PUT запрос

export const updatedTask = async (
  taskId: number,
  updatedTodo: Partial<Task>,
): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки редактировании задачи: ${response.status}`,
      );

    const data: Task = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    } else {
      throw new Error("Ошибка при добавлении задачи");
    }
  }
};

// DELETE запрос

export const deleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки при удалении задачи с сервера: ${response.status}`,
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    } else {
      throw new Error("Ошибка при добавлении задачи");
    }
  }
};
