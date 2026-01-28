import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.js";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.jsx";
import TasksList from "../components/ListOfTasks/TasksList.jsx";

import styles from "../pages/TodoListPage.module.css";

export interface Task {
  title: string;
  id: number;
  created: string;
  isDone: boolean;
}

export interface Results {
  data: Task[];

  info: {
    all: number;
    inWork: number;
    completed: number;
  };
  meta?: {
    totalAmount: number;
  };
}

const TodoListPage = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const [countTasks, setCountTasks] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedTaskFilter, setSelectedTaskFilter] = useState("all");

  const correctRequest = (title: string): string | undefined => {
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

  const updateTask = async (selectedTaskFilter: string): Promise<void> => {
    try {
      const results: Results = await getTasks(selectedTaskFilter);
      setTasksList(results.data);

      if (results.info) {
        setCountTasks({
          all: results.info.all,
          inWork: results.info.inWork,
          completed: results.info.completed,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    updateTask(selectedTaskFilter);
  }, [selectedTaskFilter]);

  return (
    <>
      <div className={styles.mainTaskName}>
        <AddTask
          onUpdateTask={() => updateTask(selectedTaskFilter)}
          correctRequest={correctRequest}
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
          correctRequest={correctRequest}
          tasksList={tasksList}
          onUpdateTask={() => updateTask(selectedTaskFilter)}
        />
      </div>
    </>
  );
};

export default TodoListPage;
