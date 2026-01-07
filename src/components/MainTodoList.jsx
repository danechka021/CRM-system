import { useEffect, useMemo, useState } from "react";

import InputTaskName from "./InputTaskName";
import FilteredTaskStatus from "./FilteredTaskStatus";
import DisplayTodoList from "./DisplayTodoList";

import styles from "./MainTodoList.module.css";

const MainTodoList = () => {
  const API_URL = "https://easydev.club/api/v1/todos";

  //Для отображения и добавления задач
  const [allTask, setAllTask] = useState([]);
  const [tasksName, setTasksName] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //Для редактирования задач
  const [editingTaskName, setEditingTaskName] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");

  //Для отображения задач по статусам
  const [filteredTasks, setFilteredTask] = useState("all");

  //Добавление задачи

  const addTodoTasks = ({ isDone, title }) => {
    const titleName = title.trim();

    if (titleName.length < 2 || titleName.length > 64) {
      alert("Название задачи должно быть от 2 до 64 символов");
      return;
    }
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone, title }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошиюки при добавлении новой задачи: ${response.statuse} `
          );
        return response.json();
      })
      .then((newTask) => {
        setTasksName((prev) => [...prev, newTask]);
        setInputValue("");
      })
      .then(() => {
        return fetch(API_URL).then((response) => response.json());
      })
      .then((newObject) => {
        setAllTask(newObject.data);
        fetchTasksStatus(filteredTasks);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  //Фильтрация задач по статусу

  const fetchTasksStatus = (status) => {
    fetch(`${API_URL}?filter=${status}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошиюки при фильтрации по статусу задачи: ${response.status} `
          );
        return response.json();
      })
      .then((newFilteredTasksArray) => setTasksName(newFilteredTasksArray.data))
      .catch((error) => {
        console.log("error:", error);
      });
  };

  useEffect(() => {
    fetchTasksStatus(filteredTasks);
  }, [filteredTasks]);

  const totalCount = useMemo(() => {
    return allTask.length;
  }, [allTask]);

  const inWorkCount = useMemo(() => {
    return allTask.filter((task) => !task.isDone).length;
  }, [allTask]);

  const completedCount = useMemo(() => {
    return allTask.filter((task) => task.isDone).length;
  }, [allTask]);

  //Отображение задач

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при получении задачи с сервера: ${response.status}`
          );

        return response.json();
      })
      .then((todoData) => setAllTask(todoData.data))
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  //Выбор статуса задачи

  const changeTaskStatus = (task) => {
    fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !task.isDone, title: task.title }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при выборе статус задачи: ${response.status}`
          );
        return response.json();
      })
      .then(() => {
        return fetch(API_URL).then((response) => {
          if (!response.ok) {
            throw new Error(`ошибка при получении задач ${response.status}`);
          }
          return response.json();
        });
      })
      .then((newObject) => {
        setAllTask(newObject.data);
        fetchTasksStatus(filteredTasks);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  //редактирование задачи

  const startEditingTask = (task) => {
    setEditingTaskName(task.id);
    setEditingTaskValue(task.title);
  };

  const canselEddit = () => {
    setEditingTaskName(null);
    setEditingTaskValue("");
  };

  const saveEditingTaskId = (task) => {
    const titleName = editingTaskValue.trim();

    if (titleName.length < 2 || titleName.length > 64) {
      alert("Название задачи должно быть от 2 до 64 символов");
      return;
    }
    fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTaskValue }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки редактировании задачи: ${response.status}`
          );
        return response.json();
      })
      .then((updateTaskName) => {
        setTasksName((prev) =>
          prev.map((oldTaskName) =>
            oldTaskName.id === updateTaskName.id ? updateTaskName : oldTaskName
          )
        );
        canselEddit();
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  //Удаление задачи

  const deleteTodoTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при удалении задачи с сервера: ${response.status}`
          );
      })
      .then(() => {
        return fetch(API_URL).then((response) => response.json());
      })
      .then((newObject) => {
        setAllTask(newObject.data);
        fetchTasksStatus(filteredTasks);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <>
      <div className={styles.mainTaskName}>
        <InputTaskName
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodoTasks={addTodoTasks}
        />
      </div>

      <div>
        <FilteredTaskStatus
          setFilteredTask={setFilteredTask}
          totalCount={totalCount}
          inWorkCount={inWorkCount}
          completedCount={completedCount}
        />
      </div>

      <div>
        <DisplayTodoList
          tasksName={tasksName}
          changeTaskStatus={changeTaskStatus}
          deleteTodoTask={deleteTodoTask}
          editingTaskName={editingTaskName}
          editingTaskValue={editingTaskValue}
          setEditingTaskValue={setEditingTaskValue}
          saveEditingTaskId={saveEditingTaskId}
          startEditingTask={startEditingTask}
          canselEddit={canselEddit}
        />
      </div>
    </>
  );
};

export default MainTodoList;
