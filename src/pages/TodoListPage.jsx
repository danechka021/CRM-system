import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.js";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.jsx";
import TasksList from "../components/ListOfTasks/TasksList.jsx";

import styles from "../pages/TodoListPage.module.css";

const TodoListPage = () => {
  const [tasksList, setTasksList] = useState([]);

  const [countTasks, setCountTasks] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedTaskFilter, setSelectedTaskFilter] = useState("all");

  const correctRequest = (title) => {
    const titleTrim = title.trim();
    if (!titleTrim) {
      return "Это поле не может быть пустым";
    } else if (titleTrim.length < 2) {
      return "Минимальная длина текста 2 символа";
    } else if (titleTrim.length > 64) {
      return "Максимальная длина текста 64 символа.";
    }
  };

  //Отображение по статусам

  const updateTask = async () => {
    try {
      const results = await getTasks(selectedTaskFilter);
      setTasksList(results.data);

      if (results.info) {
        setCountTasks({
          all: results.info.all,
          inWork: results.info.inWork,
          completed: results.info.completed,
        });
      }
    } catch (error) {
      alert(error.message || "Произошла ошибка");
      console.log(error);
    }
  };

  useEffect(() => {
    updateTask(selectedTaskFilter);
  }, [selectedTaskFilter]);

  return (
    <>
      <div className={styles.mainTaskName}>
        <AddTask onUpdtaeTask={updateTask} correctRequest={correctRequest} />
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
          correctRequest={correctRequest}
          tasksList={tasksList}
          onUpdtaeTask={updateTask}
        />
      </div>
    </>
  );
};

export default TodoListPage;
