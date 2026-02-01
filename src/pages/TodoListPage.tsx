import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.js";
import { Todo, MetaResponse, TodoInfo } from "../types.js";

import AddTask from "../components/addition/AddTask.jsx";
import TasksStatusTabs from "../components/TodoFilter/TasksStatusTabs.js";
import TasksList from "../components/ListOfTasks/TasksList.jsx";

import styles from "../pages/TodoListPage.module.css";
import { TaskStatus } from "../components/enums/task-status.enum.js";

const TodoListPage = () => {
  const [tasksList, setTasksList] = useState<Todo[]>([]);

  const [countTasks, setCountTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TaskStatus>(
    TaskStatus.ALL,
  );

  //Отображение по статусам

  const updateTask = async (selectedTaskFilter: string): Promise<void> => {
    try {
      const results: MetaResponse<Todo, TodoInfo> =
        await getTasks(selectedTaskFilter);
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
          tasksList={tasksList}
          onUpdateTask={() => updateTask(selectedTaskFilter)}
        />
      </div>
    </>
  );
};

export default TodoListPage;
