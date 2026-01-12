const API_URL = "https://easydev.club/api/v1/todos";

// POST (Отправка задачи на сервер)

export const addTask = async (title, isDone) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isDone }),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при добавлении новой задачи: ${response.status} `
      );

    try {
      const data = await response.json();
      return data;
    } catch (errorJson) {
      console.log("ошибка при парсе json:", errorJson.message);
      throw errorJson;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// GET запрос

export const getTasks = async (status) => {
  let url = API_URL;
  if (status) {
    url += `?filter=${status}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Статус ошиюки при фильтрации по статусу задачи: ${response.status} `
      );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// PUT запрос

export const updatedTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok)
      throw new Error(
        `Статус ошибки редактировании задачи: ${response.status}`
      );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// DELETE запрос

export const deleteTask = async (id) => {
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
    throw error;
  }
};
