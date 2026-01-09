const API_URL = "https://easydev.club/api/v1/todos";

// POST (Отправка задачи на сервер)

export const addTask = async (title, isDone) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone, title }),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при добавлении новой задачи: ${response.status} `
      );
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

// GET запрос (получение задач с сервера в соответствии с вбранным статусом)

export const fetchTasksByStatus = async (status) => {
  try {
    const response = await fetch(`${API_URL}?filter=${status}`);
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при фильтрации по статусу задачи: ${response.status} `
      );
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

// GET запрос отображения всех задач

export const getData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Ошибка статуса ${response.status}`);
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

// PUT запрос на сервер для выбора статуса конкретной задачи

export const changeTaskByStatus = async (task) => {
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !task.isDone, title: task.title }),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки при выборе статус задачи: ${response.status}`
      );
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

// PUT запрос для замены названия задачи на сервере

export const saveTask = async (task, editingTaskValue) => {
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTaskValue }),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки редактировании задачи: ${response.status}`
      );
    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
};

// DELETE запрос для удаления задачи с сервера

export const deleteByTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки при удалении задачи с сервера: ${response.status}`
      );
  } catch (error) {
    console.log(error.message);
  }
};
