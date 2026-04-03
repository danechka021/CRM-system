import styles from "../ListOfTasks/Tasks.module.css";
import TodoItem from "../todoItem/TodoItem";
import { Todo } from "../../../types";
import { JSX } from "react";
import { Button } from "antd";

interface TasksList {
  tasks: Todo[];
  fetchTodos: () => void;
  setEditingTaskId: (id: number | null) => void;
}

const TasksList = ({
  tasks,
  fetchTodos,
  setEditingTaskId,
}: TasksList): JSX.Element => {
  return (
    <div className={styles.displayTask}>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            fetchTodos={fetchTodos}
            setEditingTaskId={setEditingTaskId}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
