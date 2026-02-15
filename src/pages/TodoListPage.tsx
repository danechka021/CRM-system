import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.js";
import { Todo, MetaResponse, TodoInfo } from "../types.js";
import { useLocation } from "react-router-dom";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.js";
import TasksList from "../components/ListOfTasks/Tasks.js";

import styles from "../pages/TodoListPage.module.css";
import { TaskStatus } from "../types.js";
import { Outlet } from "react-router-dom";

const TodoListPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);

  const [countTasks, setCountTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TaskStatus>(
    TaskStatus.ALL,
  );

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const location = useLocation();

  //Отображение по статусам

  const updateTask = async (selectedTaskFilter: TaskStatus): Promise<void> => {
    try {
      const results: MetaResponse<Todo, TodoInfo> =
        await getTasks(selectedTaskFilter);
      setTasks(results.data);

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
    if (editingTaskId !== null && location.pathname === "/todos") return;

    const fetchAndUpdate = () => updateTask(selectedTaskFilter);
    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 5000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedTaskFilter, editingTaskId, location.pathname]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTaskName}>
        <AddTask onUpdateTask={() => updateTask(selectedTaskFilter)} />
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
          tasks={tasks}
          onUpdateTask={() => updateTask(selectedTaskFilter)}
          setEditingTaskId={setEditingTaskId}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default TodoListPage;
