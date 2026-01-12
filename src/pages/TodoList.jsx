import { useEffect, useState } from "react";
import { getTasks, updatedTask, deleteTask } from "../api/tasks.js";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.jsx";
import TasksList from "../components/ListOfTasks/TasksList.jsx";

import styles from "../pages/TodoList.module.css";

const TodoList = () => {
  //Для отображения и добавления задач
  const [tasksList, setTasksList] = useState([]);

  // Колличество задач

  const [countTasks, setCountTasks] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  //Для редактирования задач
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  //Для отображения задач по статусам
  const [selectedTaskFilter, setSelectedTaskFilter] = useState("all");

  //Отображение по статусам

  const handleError = (error) => {
    alert(error.message || "Произошла ошибка");
    console.log(error);
  };

  const toggleTasksStatus = async (status) => {
    try {
      const results = await getTasks(status);
      setTasksList(results.data);

      if (results.info) {
        setCountTasks({
          all: results.info.all,
          inWork: results.info.inWork,
          completed: results.info.completed,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    toggleTasksStatus(selectedTaskFilter);
  }, [selectedTaskFilter]);

  //Выбор статуса задачи

  const changeTaskStatus = async (task) => {
    try {
      await updatedTask(task.id, { isDone: !task.isDone });

      await toggleTasksStatus(selectedTaskFilter);
    } catch (error) {
      handleError(error);
    }
  };

  //редактирование задачи

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const canselEditingTask = () => {
    setEditingTaskId(null);
    setEditingTitle("");
  };

  const saveEditingTask = async (task, editingTaskValue) => {
    try {
      const titleName = editingTaskValue.trim();

      if (titleName.length < 2 || titleName.length > 64) {
        throw new Error("Название задачи должно быть от 2 до 64 символов");
      }
      await updatedTask(task.id, { title: editingTaskValue });

      await toggleTasksStatus(selectedTaskFilter);
      canselEditingTask();
    } catch (error) {
      handleError(error);
    }
  };

  //Удаление задачи

  const deleteTodoTask = async (id) => {
    try {
      await deleteTask(id);

      await toggleTasksStatus(selectedTaskFilter);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className={styles.mainTaskName}>
        <AddTask
          onAddTask={() => toggleTasksStatus(selectedTaskFilter)}
          handleError={handleError}
        />
      </div>

      <div>
        <TasksStatusTabs
          setSelectedTaskFilter={setSelectedTaskFilter}
          countTasks={countTasks}
          selectedTaskFilter={selectedTaskFilter}
        />
      </div>

      <div>
        <TasksList
          tasksList={tasksList}
          changeTaskStatus={changeTaskStatus}
          deleteTodoTask={deleteTodoTask}
          editingTaskName={editingTaskId}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          saveEditingTask={saveEditingTask}
          startEditingTask={startEditingTask}
          canselEditingTask={canselEditingTask}
        />
      </div>
    </>
  );
};

export default TodoList;
