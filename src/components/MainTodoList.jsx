import { useEffect, useMemo, useState } from "react";

import InputTaskName from "./InputTaskName";
import FilteredTaskStatus from "./FilteredTaskStatus";
import DisplayTodoList from "./DisplayTodoList";

import styles from "./MainTodoList.module.css";

const MainTodoList = () => {
  //Для отображения и добавления задач
  const [tasksName, setTasksName] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //Для редактирования задач
  const [editingTaskName, setEditingTaskName] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");

  //Для отображения задач по статусам
  const [filteredTasks, setFilteredTask] = useState("all");

  //Добавление задачи

  const addTodoTasks = ({ isDone, title }) => {
    if (inputValue.trim()) {
      fetch("https://easydev.club/api/v1/todos", {
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
        .catch((error) => {
          console.log("error:", error);
        });
    } else {
      confirm("Введите название задачи");
    }
  };

  //Фильтрация задач по статусу

  useEffect(() => {
    fetch(`https://easydev.club/api/v1/todos}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошиюки при фильтрации по статусу задачи: ${response.statuse} `
          );
        return response.json();
      })
      .then((newFilteredTasksArray) => setTasksName(newFilteredTasksArray.data))
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const tasksFiltrashion = useMemo(() => {
    if (filteredTasks === "inWork") {
      return tasksName.filter((task) => !task.isDone);
    }
    if (filteredTasks === "completed") {
      return tasksName.filter((task) => task.isDone);
    }
    return tasksName;
  }, [tasksName, filteredTasks]);

  //Отображение задач

  useEffect(() => {
    fetch(`https://easydev.club/api/v1/todos?filter`)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при получении задачи с сервера: ${response.status}`
          );

        return response.json();
      })
      .then((todoData) => setTasksName(todoData.data))
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  //Выбор статуса задачи

  const changeTaskStatus = (task) => {
    fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
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
      .then((newStatusTask) => {
        setTasksName((prev) =>
          prev.map((oldTask) =>
            oldTask.id === newStatusTask.id ? newStatusTask : oldTask
          )
        );
      })
      .then((error) => {
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
    fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTaskValue }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при выборе статус задачи: ${response.status}`
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
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Статус ошибки при удалении задачи с сервера: ${response.status}`
          );
      })
      .then(() => {
        setTasksName((newArrayTasksName) =>
          newArrayTasksName.filter((newTaskName) => newTaskName.id !== id)
        );
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
        <FilteredTaskStatus setFilteredTask={setFilteredTask} />
      </div>

      <div>
        <DisplayTodoList
          tasksName={tasksFiltrashion}
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
