import { useCallback, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { RootState, AppDispatch } from "../../store/store.js";
import { fetchAllTask } from "../../store/slices/todoSlice.js";

import AddTask from "../../components/Todo/addition/AddTask.js";
import TasksStatusTabs from "../../components/Todo/TodoFilter/TasksStatusTabs.js";
import TasksList from "../../components/Todo/ListOfTasks/Tasks.js";

import { TodoStatus } from "../../types.js";

import { notification } from "antd";

import styles from "../todo/TodoListPage.module.css";

const TodoListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { todos, countTasks } = useSelector((state: RootState) => state.todos);

  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TodoStatus>(
    TodoStatus.ALL,
  );

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  //Отображение по статусам

  const fetchTodos = useCallback(async () => {
    try {
      await dispatch(fetchAllTask(selectedTaskFilter)).unwrap();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const descriptions =
          error instanceof Error ? error.message : "Попробуйте позже";

        notification.error({
          message: "Ошибка при отображении задач",
          description: descriptions,
          placement: "topRight",
        });
      }
    }
  }, [dispatch, selectedTaskFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [fetchTodos, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || editingTaskId !== null) return;

    const interval = setInterval(fetchTodos, 5000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fetchTodos, editingTaskId, location.pathname, isAuthenticated]);

  return (
    <div className={styles.todoPage}>
      <div className={styles.mainContainer}>
        <div className={styles.mainTaskName}>
          <AddTask />
        </div>

        <div>
          <TasksStatusTabs
            setSelectedTaskFilter={setSelectedTaskFilter}
            countTasks={countTasks}
            selectedTaskFilter={selectedTaskFilter}
          />
        </div>

        <div className={styles.bottomIndent}>
          <TasksList
            tasks={todos}
            fetchTodos={fetchTodos}
            setEditingTaskId={setEditingTaskId}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
});

export default TodoListPage;
