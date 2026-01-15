import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.js";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.jsx";
import TasksList from "../components/ListOfTasks/TasksList.jsx";

import styles from "../pages/TodoList.module.css";

const TodoList = () => {
  const [tasksList, setTasksList] = useState([]);

  const [countTasks, setCountTasks] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedTaskFilter, setSelectedTaskFilter] = useState("all");

  const handleError = (error) => {
    alert(error.message || "Произошла ошибка");
    console.log(error);
  };

  //Отображение по статусам

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
          handleError={handleError}
          toggleTasksStatus={toggleTasksStatus}
          selectedTaskFilter={selectedTaskFilter}
        />
      </div>
    </>
  );
};

export default TodoList;
