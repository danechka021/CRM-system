import { useEffect, useMemo, useState } from "react";
import {
  addTask,
  fetchTasksByStatus,
  getData,
  changeTaskByStatus,
  saveTask,
  deleteByTask,
} from "../api/tasks.api.js";

import AddTask from "./AddTask";
import FiltersTask from "./FiltersTask";
import DisplayTodoList from "./DisplayTodoList";

import styles from "./MainTodoList.module.css";

const MainTodoList = () => {
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
  const addTodoTasks = async ({ title, isDone }) => {
    try {
      const titleName = title.trim();
      if (titleName.length < 2 || titleName.length > 64) {
        alert("Название задачи должно быть от 2 до 64 символов");
        return;
      }

      const newTask = await addTask(titleName, isDone);
      setTasksName((prev) => [...prev, newTask]);
      setInputValue("");

      const newObjectTasks = await getData();
      setAllTask(newObjectTasks.data);
      await fetchTasksStatus(filteredTasks);
    } catch (error) {
      console.log("error:", error);
    }
  };

  //Фильтрация задач по статусу

  const fetchTasksStatus = async (status) => {
    try {
      const newFilteredTasksArray = await fetchTasksByStatus(status);
      setTasksName(newFilteredTasksArray.data);
    } catch (error) {
      console.log("error:", error);
    }
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
    const displayTask = async () => {
      try {
        const todoData = await getData();
        setAllTask(todoData.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    displayTask();
  }, []);

  //Выбор статуса задачи

  const changeTaskStatus = async (task) => {
    try {
      await changeTaskByStatus(task);
      const newObject = await getData();
      setAllTask(newObject.data);
      await fetchTasksStatus(filteredTasks);
    } catch (error) {
      console.log("error:", error);
    }
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

  const saveEditingTaskId = async (task, editingTaskValue) => {
    try {
      const titleName = editingTaskValue.trim();

      if (titleName.length < 2 || titleName.length > 64) {
        alert("Название задачи должно быть от 2 до 64 символов");
        return;
      }
      await saveTask(task, editingTaskValue);
      const newObject = await getData();
      setAllTask(newObject.data);
      await fetchTasksStatus(filteredTasks);
      canselEddit();
    } catch (error) {
      console.log("error:", error);
    }
  };

  //Удаление задачи

  const deleteTodoTask = async (id) => {
    try {
      await deleteByTask(id);
      const newObject = await getData();
      setAllTask(newObject.data);
      await fetchTasksStatus(filteredTasks);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <div className={styles.mainTaskName}>
        <AddTask
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodoTasks={addTodoTasks}
        />
      </div>

      <div>
        <FiltersTask
          setFilteredTask={setFilteredTask}
          totalCount={totalCount}
          inWorkCount={inWorkCount}
          completedCount={completedCount}
          filteredTasks={filteredTasks}
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
