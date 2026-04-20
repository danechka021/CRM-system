import styles from "../ListOfTasks/Tasks.module.css";
import TodoItem from "../todoItem/TodoItem";
import { Todo } from "../../../types";
import { JSX, memo } from "react";

interface TasksList {
  tasks: Todo[];
  fetchTodos: () => void;
  setEditingTaskId: (id: number | null) => void;
}

const TasksList = memo(
  ({ tasks, fetchTodos, setEditingTaskId }: TasksList): JSX.Element => {
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
  },
);

export default TasksList;
